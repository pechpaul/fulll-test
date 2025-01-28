import { ParkVehicleCommand } from '../../Command/vehicle/parkVehicle.command';
import { VehicleRepository } from '../../../Infra/vehicle.repository';

export class ParkVehicleHandler {
    constructor(private vehicleRepository: VehicleRepository) {}

    async handle(command: ParkVehicleCommand) {
        const vehicle = await this.vehicleRepository.findById(command.vehicleId);
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