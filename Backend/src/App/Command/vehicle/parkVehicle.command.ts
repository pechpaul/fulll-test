export class ParkVehicleCommand {
    constructor(
        public readonly vehiclePlateNumber: string,
        public readonly lat: number,
        public readonly lng: number,
    ) {}
}