//
class Vehicle {
  // public drive(): void {
  //   console.log("object");
  // }
  // fields props with actual values
  // color: string;

  // constructor(color: string) {
  //   this.color = color;
  // }
  // equal to top
  // if we use public in constructor is equal to this.color = color;
  constructor(public color: string) {}
  // color: string = "red";
  public honk(): void {
    console.log("beep");
  }

  protected honkd(): void {
    console.log("beep");
  }
}

const mercede = new Vehicle("orange");
mercede.color;

class Car extends Vehicle {
  // this color come from parent
  constructor(public wheels: number, color: string) {
    super(color);
  }
  private drive(): void {
    console.log("vroom");
  }

  startDriving(): void {
    this.drive();
    this.honkd();
  }
}
// modifiers public private protected
// public can call anywhere
// private can only call by other methods in exact same class
// protected can called by other methods in this class
// or by other in child classes.
const mercedes = new Car(4, "red");
// we can not over ride modifier in child classes
mercedes.startDriving();

// FIELDS

// parcel-bundler help us run ts in browser
