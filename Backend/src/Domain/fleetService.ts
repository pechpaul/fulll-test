import {AppDataSource} from "../Infra/dataSource";
import {Vehicle} from "../Infra/Entities/vehicle.entity";
import {Fleet} from "../Infra/Entities/fleet.entity";
import {randomUUID} from "node:crypto";


const vehicleRepository = AppDataSource.getRepository(Vehicle);
const fleetRepository = AppDataSource.getRepository(Fleet);


export class FleetService {
    constructor() {
    }

    async registerVehicle(plateNumber: string, fleetId: string) {
        const fleet = await fleetRepository.findOneBy({
            id: fleetId,
        })
        let vehicle = await vehicleRepository.findOneBy({
            plateNumber,
        })
        if(!vehicle){
            vehicle = vehicleRepository.create({plateNumber:plateNumber})
            await vehicleRepository.save(vehicle)
        }
        if(!fleet){
            throw new Error(`Fleet ${fleetId} doesn't exist`);
        }

        fleet.vehicles = fleet.getVehicles()
        if (fleet && fleet.vehicles.map(vehicle => vehicle.plateNumber).includes(vehicle.plateNumber)) {
            throw new Error('Vehicle already registered');
        }
        if (fleet) {
            fleet.vehicles.push(vehicle);
            await fleetRepository.save(fleet)
        } else {
            throw new Error(`fleet ${fleetId} doesn't exist`);
        }
    }

    async isVehicleRegistered(plateNumber: string): Promise<boolean> {
        return !!await vehicleRepository.findOneBy({
            plateNumber,
        })
    }
}
