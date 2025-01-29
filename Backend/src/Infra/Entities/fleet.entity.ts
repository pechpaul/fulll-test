import {Entity, Column, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import { Vehicle } from './vehicle.entity';

@Entity()
export class Fleet {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    userId: string;

    @OneToMany(() => Vehicle, (vehicle) => vehicle.fleet)
    vehicles: Vehicle[];

    constructor(userId: string) {
        this.userId = userId;
    }

    getVehicles(): Vehicle[] {
        return this.vehicles ?? [];
    }
}