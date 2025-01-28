import {Given, When, Then} from '@cucumber/cucumber';
import { RegisterVehicleCommand } from '../../App/Command/vehicle/registerVehicle.command';
import { RegisterVehicleHandler } from '../../App/Handler/vehicle/registerVehicle.handler';
import { ParkVehicleCommand } from '../../App/Command/vehicle/parkVehicle.command';
import { ParkVehicleHandler } from '../../App/Handler/vehicle/parkVehicle.handler';
import {Fleet} from "../../Infra/Entities/fleet.entity";
import {Vehicle} from "../../Infra/Entities/vehicle.entity";
import {AppDataSource} from "../../Infra/dataSource";
const assert = require('assert');

const vehicleRepository = AppDataSource.getRepository(Vehicle);
const fleetRepository = AppDataSource.getRepository(Fleet);
let registerVehicleHandler: RegisterVehicleHandler = new RegisterVehicleHandler();
let parkVehicleHandler: ParkVehicleHandler = new ParkVehicleHandler();
let myFleet: Fleet;
let aVehicle: Vehicle;
let aLocation: [number, number];
let command: ParkVehicleCommand;

Given('my fleet for parking', async () => {
    await AppDataSource.initialize();
    myFleet = new Fleet()
});

Given('a vehicle for parking', async () => {
    aVehicle = new Vehicle()
    aVehicle.plateNumber = 'thisiaplatenumber'
});

Given('I have registered this vehicle into my fleet for parking', async () => {
    const command = new RegisterVehicleCommand(aVehicle.plateNumber, myFleet.id);
    await registerVehicleHandler.handle(command);
});

Given('a location', async () => {
    aLocation = [1234,1234]
});

When('I park my vehicle at this location', async () => {
    const command = new ParkVehicleCommand(aVehicle.plateNumber, aLocation[0], aLocation[1]);
    await parkVehicleHandler.handle(command);
});

Then('the known location of my vehicle should verify this location', async () => {
    const updatedVehicle = await vehicleRepository.findOneBy({plateNumber: aVehicle.plateNumber})
    assert(!!updatedVehicle && updatedVehicle.latitude === aLocation[0] && updatedVehicle.longitude === aLocation[1]);
});

When('I try to park my vehicle at this location', async () => {
    command = new ParkVehicleCommand(aVehicle.plateNumber, aLocation[0], aLocation[1]);
});

Then('I should be informed that my vehicle is already parked at this location', async () => {
    try {
        await parkVehicleHandler.handle(command)
    } catch (err :any) {
        assert(err.message === `Vehicle ${aVehicle.plateNumber} is already parked at location ${aLocation}`)
    }});