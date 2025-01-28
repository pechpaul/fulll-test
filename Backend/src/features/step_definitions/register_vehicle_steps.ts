import {Given, When, Then} from '@cucumber/cucumber';
import { RegisterVehicleCommand } from '../../App/Command/vehicle/registerVehicle.command';
import { RegisterVehicleHandler } from '../../App/Handler/vehicle/registerVehicle.handler';
import { Fleet } from '../../Domain/fleet';
import { Vehicle } from '../../Domain/vehicle';
import { VehicleRepository } from '../../Infra/vehicle.repository';
import { FleetRepository } from '../../Infra/fleet.repository';
const assert = require('assert');

let vehicleRepository: VehicleRepository = new VehicleRepository();
let fleetRepository: FleetRepository = new FleetRepository();
let registerVehicleHandler: RegisterVehicleHandler = new RegisterVehicleHandler(vehicleRepository, fleetRepository);
let myFleet : Fleet;
let anotherFleet: Fleet;
let aVehicle: Vehicle;
let command: RegisterVehicleCommand;

Given('my fleet', async () => {
    myFleet = new Fleet('fleet1')
    await fleetRepository.save(myFleet)
});

Given('a vehicle', async () => {
    aVehicle = new Vehicle('vehicle1')
    await vehicleRepository.save(aVehicle)
});

When('I register this vehicle into my fleet', async () => {
    command = new RegisterVehicleCommand(aVehicle.id, myFleet.id);
    await registerVehicleHandler.handle(command);
});

When('I have registered this vehicle into my fleet', async () => {
    const command = new RegisterVehicleCommand(aVehicle.id, myFleet.id);
    await registerVehicleHandler.handle(command);
});

Then('this vehicle should be part of my vehicle fleet', async () => {
    assert(myFleet?.isVehicleRegistered(aVehicle.id));
});

When('I try to register this vehicle into my fleet', async () => {
    command = new RegisterVehicleCommand(aVehicle.id, myFleet.id);
});

Then('I should be informed this this vehicle has already been registered into my fleet', async () => {
    try {
        await registerVehicleHandler.handle(command)
    } catch (err :any) {
        assert(err.message === `this vehicle is already registered: ${aVehicle.id}`)
    }
});


Given('the fleet of another user', async () => {
    anotherFleet = new Fleet('fleet2')
    await fleetRepository.save(anotherFleet)
});

Given('this vehicle has been registered into the other user\'s fleet', async () => {
    const command = new RegisterVehicleCommand(aVehicle.id, anotherFleet.id);
    await registerVehicleHandler.handle(command);
});
