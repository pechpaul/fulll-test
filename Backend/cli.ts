import { Command } from 'commander';
import {Fleet} from "./src/Domain/fleet";

const program = new Command();

program
    .command('create')
    .argument('<userId>', 'User ID')
    .description('Create a new fleet for the user')
    .action(async (userId) => {
        const fleet = new Fleet(userId);
        await fleetRepository.save(fleet)
        console.log(`Fleet created with ID: ${fleetId}`);
    });

program
    .command('register-vehicle')
    .argument('<fleetId>', 'Fleet ID')
    .argument('<vehiclePlateNumber>', 'Vehicle Plate Number')
    .description('Register a vehicle to a fleet')
    .action(async (fleetId, vehiclePlateNumber) => {
        await registerVehicle(fleetId, vehiclePlateNumber);
        console.log(`Vehicle ${vehiclePlateNumber} registered to fleet ${fleetId}`);
    });

program
    .command('localize-vehicle')
    .argument('<fleetId>', 'Fleet ID')
    .argument('<vehiclePlateNumber>', 'Vehicle Plate Number')
    .argument('<lat>', 'Latitude')
    .argument('<lng>', 'Longitude')
    .argument('[alt]', 'Altitude')
    .description('Localize a vehicle to a specific location')
    .action(async (fleetId, vehiclePlateNumber, lat, lng, alt) => {
        await localizeVehicle(fleetId, vehiclePlateNumber, { lat, lng, alt });
        console.log(`Vehicle ${vehiclePlateNumber} localized to (${lat}, ${lng}, ${alt || 0})`);
    });

program.parse();