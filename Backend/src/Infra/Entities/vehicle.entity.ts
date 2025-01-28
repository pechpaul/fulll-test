import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import {Fleet} from "./fleet.entity";


@Entity()
export class Vehicle {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    plateNumber: string;

    @Column()
    latitude: number;

    @Column()
    longitude: number;

    @Column({ nullable: true })
    altitude?: number;

    @ManyToOne(() => Fleet, (fleet) => fleet.vehicles)
    fleet: Fleet;
}