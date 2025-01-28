import {Given, When, Then} from '@cucumber/cucumber';
import { RegisterVehicleCommand } from '../../App/Command/vehicle/registerVehicle.command';
import { RegisterVehicleHandler } from '../../App/Handler/vehicle/registerVehicle.handler';
import { ParkVehicleCommand } from '../../App/Command/vehicle/parkVehicle.command';
import { ParkVehicleHandler } from '../../App/Handler/vehicle/parkVehicle.handler';
import { Fleet } from '../../Domain/fleet';
import { Vehicle } from '../../Domain/vehicle';
import { VehicleRepository } from '../../Infra/vehicle.repository';
import { FleetRepository } from '../../Infra/fleet.repository';
const assert = require('assert');

let vehicleRepository: VehicleRepository = new VehicleRepository();
let fleetRepository: FleetRepository = new FleetRepository();
let registerVehicleHandler: RegisterVehicleHandler = new RegisterVehicleHandler(vehicleRepository, fleetRepository);
let parkVehicleHandler: ParkVehicleHandler = new ParkVehicleHandler(vehicleRepository);
let myFleet : Fleet;
let aVehicle: Vehicle;
let aLocation: [number, number];
let command: ParkVehicleCommand;

Given('my fleet for parking', async () => {
    myFleet = new Fleet('fleet1')
    await fleetRepository.save(myFleet)
});

Given('a vehicle for parking', async () => {
    aVehicle = new Vehicle('vehicle1')
    await vehicleRepository.save(aVehicle)
});

Given('I have registered this vehicle into my fleet for parking', async () => {
    const command = new RegisterVehicleCommand(aVehicle.id, myFleet.id);
    await registerVehicleHandler.handle(command);
});

Given('a location', async () => {
    aLocation = [1234,1234]
});

When('I park my vehicle at this location', async () => {
    const command = new ParkVehicleCommand(aVehicle.id, aLocation);
    await parkVehicleHandler.handle(command);
});

Then('the known location of my vehicle should verify this location', async () => {
    assert(aVehicle.knownLocation() === aLocation);
});

When('I try to park my vehicle at this location', async () => {
    command = new ParkVehicleCommand(aVehicle.id, aLocation);
});

Then('I should be informed that my vehicle is already parked at this location', async () => {
    try {
        await parkVehicleHandler.handle(command)
    } catch (err :any) {
        assert(err.message === `Vehicle ${aVehicle.id} is already parked at location ${aLocation}`)
    }});