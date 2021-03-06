// you must get types for every package for let ts know to help you.
// type definition file. @types/{lib name} from definitely type project.
import faker from "faker";
import { Mappable } from "./GMap";

// we use implements to set boundry for ts when we have error show exactly where it happen.
export class User implements Mappable {
  name: string;
  location: {
    lat: number;
    lng: number;
  };
  // color: string = 'red';
  constructor() {
    this.name = faker.name.firstName();
    this.location = {
      lat: parseFloat(faker.address.latitude()),
      lng: parseFloat(faker.address.longitude())
    };
  }

  public markerContent(): string {
    return `User name : ${this.name}`;
  }
}
