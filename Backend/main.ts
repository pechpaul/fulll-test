import { AppDataSource } from './src/Infra/dataSource';

(async () => {
    await AppDataSource.initialize()
    console.log('Data Source initialized!');
})();