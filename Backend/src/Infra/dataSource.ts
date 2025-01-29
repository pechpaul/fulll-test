import { DataSource as TypeORMDataSource } from 'typeorm';
import {Vehicle} from "./Entities/vehicle.entity";
import {Fleet} from "./Entities/fleet.entity";

export const AppDataSource = new TypeORMDataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '1234',
    database: 'postgres',
    logging: false,
    synchronize: true,
    entities: [Fleet, Vehicle],
    subscribers: [],
});