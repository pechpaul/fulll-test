export class ParkVehicleCommand {
    constructor(
        public readonly vehicleId: string,
        public readonly location: [number, number]
    ) {}
}