import {AppDataSource} from "../Infra/dataSource";
import {Vehicle} from "../Infra/Entities/vehicle.entity";

const vehicleRepository = AppDataSource.getRepository(Vehicle);

export class VehicleService {
    constructor(
        public readonly id: string,
    ) {
    }

    async isParkedAt(location: [number, number]): Promise<boolean> {
        const vehicle = await vehicleRepository.findOneBy({
            id: this.id,
        })
        return vehicle?.latitude === location[0] && vehicle?.longitude == location[1] ;
    }

    async knownLocation(): Promise<[number | undefined, number | undefined]> {
        const vehicle = await vehicleRepository.findOneBy({
            id: this.id,
        })
        return [vehicle?.latitude, vehicle?.longitude];
    }

    async parkAt(location: [number, number]) {
        await AppDataSource
            .createQueryBuilder()
            .update(Vehicle)
            .set({ latitude: location[0], longitude: location[1] })
            .where("id = :id", { id: this.id })
            .execute()
    }

    async save(plateNumber: string, fleetId: string){
        return await vehicleRepository.save({
            plateNumber, fleetId
        })
    }
}
