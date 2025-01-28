import { ParkVehicleCommand } from '../../Command/vehicle/parkVehicle.command';
import {Vehicle} from "../../../Infra/Entities/vehicle.entity";
import {AppDataSource} from "../../../Infra/dataSource";

export class ParkVehicleHandler {
    async handle(command: ParkVehicleCommand) {
        const vehicleRepository = AppDataSource.getRepository(Vehicle);
        const vehicle = await vehicleRepository.findOneBy({plateNumber: command.vehiclePlateNumber})
        if (!vehicle) {
            throw new Error(`Vehicle ${command.vehiclePlateNumber} doesn't exist`);
        }

        if (vehicle.latitude === command.lat && vehicle.longitude === command.lng) {
            throw new Error(`Vehicle ${command.vehiclePlateNumber} is already parked at location [${command.lat}, ${command.lng}]`);
        }
        vehicle.latitude = command.lat
        vehicle.longitude = command.lng
        await vehicleRepository.save(vehicle);
    }
}