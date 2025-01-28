export class Fleet {
    private vehicles: Set<string> = new Set();

    constructor(public readonly id: string) {}

    registerVehicle(vehicleId: string) {
        if (this.vehicles.has(vehicleId)) {
            throw new Error('Vehicle already registered');
        }
        this.vehicles.add(vehicleId);
    }

    isVehicleRegistered(vehicleId: string): boolean {
        return this.vehicles.has(vehicleId);
    }
}
