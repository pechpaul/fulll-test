import { Fleet } from '../Domain/fleet';

export class FleetRepository {
    private fleets: Map<string, Fleet> = new Map();

    async findById(fleetId: string): Promise<Fleet | undefined> {
        return this.fleets.get(fleetId);
    }

    async save(fleet: Fleet): Promise<void> {
        this.fleets.set(fleet.id, fleet);
    }
}