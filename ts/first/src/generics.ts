//
class ArrOfNum {
  constructor(public collection: number[]) {}

  get(index: number): number {
    return this.collection[index];
  }
}

class ArrOfString {
  constructor(public collection: string[]) {}

  get(index: number): string {
    return this.collection[index];
  }
}

class ArrOfAny<T> {
  constructor(public collection: T[]) {}
  get(index: number): T {
    return this.collection[index];
  }
}

/// function generics

function printStr(arr: string): void {}
function printNum(arr: number): void {}
function print<T>(arr: T[]): void {}

// generic constraints
class Car {
  print() {
    console.log("car");
  }
}
class House {
  print() {
    console.log("HOuse");
  }
}
// ------------------------------------------------------------------
interface Printable {
  print(): void;
}

function printHouseOrCar<T extends Printable>(arr: T[]): void {
  // because maybe arr[i] have not print() on it like [1,2,4] instead of [car, house ] there for we use constraints => we promise by interface =>
  // T extends Printable
  for (let i = 0; i < arr.length; i++) {
    arr[i].print();
  }
}
