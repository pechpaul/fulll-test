export class Vehicle {
    constructor(
        public readonly id: string,
        private parkedLocation?: [number, number]
    ) {}

    isParkedAt(location: [number, number]): boolean {
        return this.parkedLocation === location;
    }

    knownLocation(): [number, number] | undefined {
        return this.parkedLocation;
    }

    parkAt(location: [number, number]) {
        this.parkedLocation = location;
    }
}
