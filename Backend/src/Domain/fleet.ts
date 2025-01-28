import {AppDataSource} from "../Infra/dataSource";
import {Vehicle} from "../Infra/Entities/vehicle.entity";
import {Fleet} from "../Infra/Entities/fleet.entity";

const vehicleRepository = AppDataSource.getRepository(Vehicle);
const fleetRepository = AppDataSource.getRepository(Fleet);


export class FleetService {
    async registerVehicle(vehicle: Vehicle, fleetId: string) {
        const fleet = await fleetRepository.findOneBy({
            id: fleetId,
        })
        if (fleet && fleet.vehicles.map(vehicle=>vehicle.id).includes(vehicle.id)) {
            throw new Error('Vehicle already registered');
        }
        if(fleet) {
            fleet.vehicles.push(vehicle);
            await fleetRepository.save(fleet)
        } else{
            throw new Error(`fleet ${fleetId} doesn't exist`);
        }
    }

    isVehicleRegistered(vehicleId: string): boolean {
        return this.vehicles.has(vehicleId);
    }
}
