import { RegisterVehicleCommand } from '../../Command/vehicle/registerVehicle.command';
import { VehicleRepository } from '../../../Infra/vehicle.repository';
import { FleetRepository } from '../../../Infra/fleet.repository';

export class RegisterVehicleHandler {
    constructor(
        private vehicleRepository: VehicleRepository,
        private fleetRepository: FleetRepository
    ) {}

    async handle(command: RegisterVehicleCommand) {
        const fleet = await this.fleetRepository.findById(command.fleetId);
        if (!fleet) {
            throw new Error('Fleet does not exist');
        }

        const vehicle = await this.vehicleRepository.findById(command.vehicleId);
        if (vehicle && fleet.isVehicleRegistered(vehicle.id)) {
            throw new Error(`this vehicle is already registered: ${command.vehicleId}`);
        }

        fleet.registerVehicle(command.vehicleId);
        await this.fleetRepository.save(fleet);
    }
}