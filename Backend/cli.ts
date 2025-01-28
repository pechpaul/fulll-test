import {Command} from 'commander';
import {AppDataSource} from "./src/Infra/dataSource";
import {Vehicle} from "./src/Infra/Entities/vehicle.entity";
import {Fleet} from "./src/Infra/Entities/fleet.entity";
import {FleetService} from "./src/Domain/fleetService";

const vehicleRepository = AppDataSource.getRepository(Vehicle);
const fleetRepository = AppDataSource.getRepository(Fleet);
const fleetService = new FleetService()

const program = new Command();

program
    .command('create')
    .argument('<userId>', 'User ID')
    .description('Create a new fleet for the user')
    .action(async (userId) => {
        const fleet = new Fleet();
        await fleetRepository.save(fleet)
        console.log(`Fleet created with ID: ${fleet.id}`);
    });

program
    .command('register-vehicle')
    .argument('<fleetId>', 'Fleet ID')
    .argument('<vehiclePlateNumber>', 'Vehicle Plate Number')
    .description('Register a vehicle to a fleet')
    .action(async (fleetId, vehiclePlateNumber) => {
        await fleetService.registerVehicle(fleetId, vehiclePlateNumber);
        console.log(`Vehicle ${vehiclePlateNumber} registered to fleet ${fleetId}`);
    });

program
    .command('localize-vehicle')
    .argument('<fleetId>', 'Fleet ID')
    .argument('<vehiclePlateNumber>', 'Vehicle Plate Number')
    .argument('<lat>', 'Latitude')
    .argument('<lng>', 'Longitude')
    .argument('[alt]', 'Altitude')
    .description('Localize a vehicle to a specific location')
    .action(async (fleetId, vehiclePlateNumber, lat, lng, alt) => {
        const vehicle = await vehicleRepository.findOneBy({plateNumber: vehiclePlateNumber});
        if (vehicle) {
            console.log(`Vehicle ${vehiclePlateNumber} localized to (${vehicle.latitude}, ${vehicle.longitude}, ${vehicle.altitude || 0})`);
        }
    });

program.parse();