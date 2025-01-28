export class RegisterVehicleCommand {
    constructor(
        public readonly vehicleId: string,
        public readonly fleetId: string
    ) {}
}