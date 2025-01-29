import {Given, When, Then, BeforeAll, AfterAll} from '@cucumber/cucumber';
import { RegisterVehicleCommand } from '../../App/Command/vehicle/registerVehicle.command';
import { RegisterVehicleHandler } from '../../App/Handler/vehicle/registerVehicle.handler';
import {Fleet} from "../../Infra/Entities/fleet.entity";
import {Vehicle} from "../../Infra/Entities/vehicle.entity";
import {FleetService} from "../../Domain/fleetService";
import {AppDataSource} from "../../Infra/dataSource";
import {randomUUID} from "node:crypto";
const assert = require('assert');

const vehicleRepository = AppDataSource.getRepository(Vehicle);
const fleetRepository = AppDataSource.getRepository(Fleet);
const fleetService = new FleetService()
let registerVehicleHandler: RegisterVehicleHandler = new RegisterVehicleHandler();
let myFleet : Fleet;
let anotherFleet: Fleet;
let aVehicle: Vehicle;
let command: RegisterVehicleCommand;

BeforeAll(async function () {
    if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
    }
});

Given('my fleet', async () => {
    myFleet = fleetRepository.create({userId: randomUUID()})
    await fleetRepository.save(myFleet)
});

Given('a vehicle', async () => {
    aVehicle = vehicleRepository.create({plateNumber:randomUUID()})
    await vehicleRepository.save(aVehicle)
});

When('I register this vehicle into my fleet', async () => {
    command = new RegisterVehicleCommand(aVehicle.plateNumber, myFleet.id);
    await registerVehicleHandler.handle(command);
});

When('I have registered this vehicle into my fleet', async () => {
    const command = new RegisterVehicleCommand(aVehicle.plateNumber, myFleet.id);
    await registerVehicleHandler.handle(command);
});

Then('this vehicle should be part of my vehicle fleet', async () => {
    assert(await fleetService.isVehicleRegistered(aVehicle.plateNumber));
});

When('I try to register this vehicle into my fleet', async () => {
    command = new RegisterVehicleCommand(aVehicle.plateNumber, myFleet.id);
});

Then('I should be informed this this vehicle has already been registered into my fleet', async () => {
    try {
        await registerVehicleHandler.handle(command)
    } catch (err :any) {
        assert(err.message === `this vehicle is already registered: ${aVehicle.plateNumber}`)
    }
});


Given('the fleet of another user', async () => {
    anotherFleet = new Fleet(randomUUID())
    await fleetRepository.save(anotherFleet)
});

Given('this vehicle has been registered into the other user\'s fleet', async () => {
    const command = new RegisterVehicleCommand(aVehicle.plateNumber, anotherFleet.id);
    await registerVehicleHandler.handle(command);
});

AfterAll(async function () {
    if (AppDataSource.isInitialized) {
        await AppDataSource.destroy();
        console.log('Database connection closed');
    }
});
