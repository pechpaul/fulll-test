import { RegisterVehicleCommand } from '../../Command/vehicle/registerVehicle.command';
import {Vehicle} from "../../../Infra/Entities/vehicle.entity";
import {AppDataSource} from "../../../Infra/dataSource";
import {Fleet} from "../../../Infra/Entities/fleet.entity";

export class RegisterVehicleHandler {

    async handle(command: RegisterVehicleCommand) {
        const vehicleRepository = AppDataSource.getRepository(Vehicle);
        const fleetRepository = AppDataSource.getRepository(Fleet);
        const fleet = await fleetRepository.findOneBy({id: command.fleetId})

        if (!fleet) {
            throw new Error('Fleet does not exist');
        }

        const vehicle = await vehicleRepository.findOneBy({plateNumber:command.plateNumber});
        if(!vehicle){
            throw new Error(`Vehicle ${command.plateNumber} doesn't exist`);
        }
        fleet.vehicles = fleet.getVehicles()

        if (vehicle && fleet.vehicles.map((vehicle: Vehicle)=>vehicle.plateNumber).includes(vehicle.plateNumber)) {
            throw new Error(`this vehicle is already registered: ${command.plateNumber}`);
        }

        fleet.vehicles.push(vehicle)
        await fleetRepository.save(fleet);
    }
}