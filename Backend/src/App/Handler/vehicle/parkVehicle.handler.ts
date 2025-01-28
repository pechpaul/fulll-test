import { ParkVehicleCommand } from '../../Command/vehicle/parkVehicle.command';
import { VehicleRepository } from '../../../Infra/vehicle.repository';
import {Repository} from "typeorm";
import {Vehicle} from "../../../Infra/Entities/vehicle.entity";

export class ParkVehicleHandler {
    constructor(private vehicleRepository: Repository<Vehicle>) {}

    async handle(command: ParkVehicleCommand) {
        const vehicle = await this.vehicleRepository.findOneBy({id: command.vehicleId});
        if (!vehicle) {
            throw new Error(`Vehicle ${command.vehicleId} doesn't exist`);
        }

        if (vehicle.isParkedAt(command.location)) {
            throw new Error(`Vehicle ${command.vehicleId} is already parked at location ${command.location}`);
        }

        vehicle.parkAt(command.location);
        await this.vehicleRepository.save(vehicle);
    }
}