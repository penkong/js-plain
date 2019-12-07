// advanced typing
//  intersection types
//  type gaurds
//  discrimintated union
//  type casting
//  functon overloads.
// ===============================================
// intersection types allow us combine other types
// can be interface also
type Admin = {
  name: string;
  privilages: string[];
};

// can be interface also
type Employee = {
  name: string;
  startDate: Date;
};
// can be interface also
// interface ElevatedEmployee extends Employee, Admin{}
type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
  name: "mk",
  privilages: ["create"],
  startDate: new Date()
};

type Numeric = string | number;
type Combined = string | boolean;
type Universal = Numeric & Combined;

// ==================================================
// type gaurds
// help us with union types
function addi(a: Numeric, b: Numeric) {
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  return a + b;
}

type UnkonwnEmployee = Employee | Admin;

function printEmployee(emp: UnkonwnEmployee) {
  console.log("name" + emp.name);
  // this is type gaurd
  if ("privilages" in emp) {
    console.log("Privilages" + emp.privilages);
  }
}

class Car {
  drive() {
    console.log("driving");
  }
}

class Truck {
  drive() {
    console.log("driving truck");
  }

  loadCargo() {
    console.log("loadCargo");
  }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
  vehicle.drive();
  // can not use instance of on interface
  if (vehicle instanceof Truck) {
    vehicle.loadCargo();
  }
}

// ===============================================
// Discriminated Union
// pattern use it when work with type unions
// makes implementing type gaurd easier
interface Bird {
  // give interface discriminated union
  // add recognizable info to interface
  type: "bird";
  flyingSpeed: number;
}

interface Horse {
  type: "horse";
  runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  let speed;
  switch (animal.type) {
    case "bird":
      speed = animal.flyingSpeed;
      break;
    case "horse":
      speed = animal.runningSpeed;
      break;
  }
  console.log("animal speed is" + speed);
}
// =============================================
// type casting
// help tell ts that some valu is of specific type
// where ts can not able to detect
// useage for DOM exist or not

const p = document.querySelector("p");
// can add ! to end. check if it extist
// but for . notation activation need more steps
// const pwithId = document.getElementById('p-message');
// give type  by type casting
const pwithId = <HTMLInputElement>document.getElementById("p-message");
const pwithId1 = document.getElementById("p-message")! as HTMLInputElement;
// ! say it will never yield null
const pwithId2 = document.getElementById("p-message");
// if we dont use ! use this way
if (pwithId2) {
  (pwithId2 as HTMLInputElement).value = "hi ther";
}
pwithId.value = "hi there";

// ==============================================
// index types
// objecgt flexible
// validation input
interface ErrorContainer {
  // when we dont know name of key email usernaem or ...
  // email: string;
  // userName: string;
  [prop: string]: string;
}

const errorBag: ErrorContainer = {
  email: "we have error",
  1: "hello"
};

// ===============================================
// function overload
// define multiple function signature to save one at same
// means we can have multiple possible ways of calling
// specify return type of function. can use type casting
// ts merge this two;
function addex(a: string, b: string): string;
function addex(a: number, b: number): number;
function addex(a: Numeric, b: Numeric) {
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  return a + b;
}
// ===============================================
// optional chaining
// when we fetch data and we not certain about props of object
//
const fetchUserData = {
  id: "23",
  name: "mk",
  job: { title: "boss", desc: "my compony" }
};
// maybe title not set by backend
console.log(fetchUserData?.job?.title);
// ------------------------------
// nullish data or nullish Coalescing
// when you dont know info is null or undefined or valid
const userInputed = null; // '' maybe want it.
// const storedData = userInputed || "DEFAULT";
// means if it null or undefined not for zero or empty string works.
const storedData = userInputed ?? "DEFAULT";
