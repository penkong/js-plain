// interfaces + classes = really reuse.
// create a new type
// describe prop names and value type

// it's type
// can delete from interface but vehicle must satisfy Vehicle.
interface Vehicle {
  name: string;
  year: number;
  now: Date;
  broken: boolean;
  summary(): string;
}
interface Reportable {
  // name: string;
  // year: number;
  // now: Date;
  // broken: boolean;
  summary(): string;
}

const oldCivic = {
  name: "civic",
  year: 2000,
  broken: true,
  now: new Date(),
  summary(): string {
    return "heelo";
  }
};

// for fix long annotations.

const printVehicle = (vehicle: Vehicle): void => {
  // console.log(vehicle.name);
  console.log(vehicle.summary());
  // console.log(vehicle.year);
  // console.log(vehicle.broken);
};

const printSummary = (item: Reportable): void => {
  // console.log(vehicle.name);
  console.log(item.summary());
  // console.log(vehicle.year);
  // console.log(vehicle.broken);
};

printVehicle(oldCivic);

// interface is gatekeeper to exec function.
// general strategy in ts for reuse
// crete funcs that accept args that typed with interfaces.
// object and classes can make decision to implement  given interfcae to
// work with a func.
