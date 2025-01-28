import { Vehicle } from '../Domain/vehicle';

export class VehicleRepository {
    private vehicles: Map<string, Vehicle> = new Map();

    async findById(vehicleId: string): Promise<Vehicle | undefined> {
        return this.vehicles.get(vehicleId);
    }

    async save(vehicle: Vehicle): Promise<void> {
        this.vehicles.set(vehicle.id, vehicle);
    }
}