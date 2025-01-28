import {Entity, Column, ManyToOne, PrimaryColumn} from 'typeorm';
import {Fleet} from "./fleet.entity";


@Entity()
export class Vehicle {
    @PrimaryColumn()
    plateNumber: string;

    @Column({ nullable: true })
    latitude: number;

    @Column({ nullable: true })
    longitude: number;

    @Column({ nullable: true })
    altitude?: number;

    @ManyToOne(() => Fleet, (fleet) => fleet.vehicles)
    fleet: Fleet;
}