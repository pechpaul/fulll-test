import { RegisterVehicleCommand } from '../../Command/vehicle/registerVehicle.command';
import {Repository} from "typeorm";
import {Vehicle} from "../../../Infra/Entities/vehicle.entity";
import {Fleet} from "../../../Infra/Entities/fleet.entity";

export class RegisterVehicleHandler {
    constructor(
        private vehicleRepository: Repository<Vehicle>,
        private fleetRepository: Repository<Fleet>
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