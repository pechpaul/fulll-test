import { DataSource as TypeORMDataSource } from 'typeorm';

export const AppDataSource = new TypeORMDataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '1234',
    database: 'postgres',
    logging: false,
    entities: ['src/Infra/entities/*.ts'],
    subscribers: [],
});