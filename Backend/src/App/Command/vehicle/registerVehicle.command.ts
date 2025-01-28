export class RegisterVehicleCommand {
    constructor(
        public readonly plateNumber: string,
        public readonly fleetId: string
    ) {}
}