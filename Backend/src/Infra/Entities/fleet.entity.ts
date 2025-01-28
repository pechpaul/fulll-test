import {Entity, PrimaryColumn, Column, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import { Vehicle } from './vehicle.entity';

@Entity()
export class Fleet {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    userId: string;

    @OneToMany(() => Vehicle, (vehicle) => vehicle.fleet)
    vehicles: Vehicle[];
}