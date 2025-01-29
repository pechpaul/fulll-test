import {Command} from 'commander';
import {AppDataSource} from "./src/Infra/dataSource";
import {Vehicle} from "./src/Infra/Entities/vehicle.entity";
import {Fleet} from "./src/Infra/Entities/fleet.entity";
import {FleetService} from "./src/Domain/fleetService";
import {ParkVehicleCommand} from "./src/App/Command/vehicle/parkVehicle.command";
import {RegisterVehicleCommand} from "./src/App/Command/vehicle/registerVehicle.command";
import {RegisterVehicleHandler} from "./src/App/Handler/vehicle/registerVehicle.handler";
import {ParkVehicleHandler} from "./src/App/Handler/vehicle/parkVehicle.handler";


const vehicleRepository = AppDataSource.getRepository(Vehicle);
const fleetRepository = AppDataSource.getRepository(Fleet);
const fleetService = new FleetService()

const program = new Command();

program
    .command('create')
    .argument('<userId>', 'User ID')
    .description('Create a new fleet for the user')
    .action(async (userId) => {
        await AppDataSource.initialize()
        const fleet = fleetRepository.create({userId: userId})
        await fleetRepository.save(fleet)
        console.log(`Fleet created with ID: ${fleet.id}`);
    });

program
    .command('register-vehicle')
    .argument('<fleetId>', 'Fleet ID')
    .argument('<vehiclePlateNumber>', 'Vehicle Plate Number')
    .description('Register a vehicle to a fleet')
    .action(async (fleetId, vehiclePlateNumber) => {
        await AppDataSource.initialize()
        await fleetService.registerVehicle(vehiclePlateNumber, fleetId);
        console.log(`Vehicle ${vehiclePlateNumber} registered to fleet ${fleetId}`);
    });

program
    .command('localize-vehicle')
    .argument('<fleetId>', 'Fleet ID')
    .argument('<vehiclePlateNumber>', 'Vehicle Plate Number')
    .argument('[lat]', 'Latitude')
    .argument('[lng]', 'Longitude')
    .description('Localize a vehicle to a specific location')
    .action(async (fleetId, vehiclePlateNumber, lat, lng, alt) => {
        await AppDataSource.initialize()
        let registerVehicleHandler: RegisterVehicleHandler = new RegisterVehicleHandler();
        let parkVehicleHandler: ParkVehicleHandler = new ParkVehicleHandler();
        let vehicle = await vehicleRepository.findOneBy({plateNumber: vehiclePlateNumber});
        const fleet = await fleetRepository.findOneBy({id: fleetId})
        if(lat && lng && fleet){
            await registerVehicleHandler.handle(new RegisterVehicleCommand(vehiclePlateNumber, fleet.id));
            const command = new ParkVehicleCommand(vehiclePlateNumber, lat, lng);
            await parkVehicleHandler.handle(command);
            vehicle = await vehicleRepository.findOneBy({plateNumber: vehiclePlateNumber});
        }
        if (vehicle) {
            console.log(`Vehicle ${vehiclePlateNumber} localized to (${vehicle.latitude}, ${vehicle.longitude}, ${vehicle.altitude || 0})`);
        }
    });

program.parse();