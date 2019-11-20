// you must get types for every package for let ts know to help you.
// type definition file. @types/{lib name} from definitely type project.
import faker from "faker";
import { Mappable } from "./GMap";

export class Company implements Mappable {
  companyName: string;
  catchPhrase: string;
  location: {
    lat: number;
    lng: number;
  };

  constructor() {
    this.companyName = faker.company.companyName();
    this.catchPhrase = faker.company.catchPhrase();
    this.location = {
      lat: parseFloat(faker.address.latitude()),
      lng: parseFloat(faker.address.longitude())
    };
  }

  public markerContent(): string {
    return `User name : ${this.companyName} and catchPhraase: ${this.catchPhrase}`;
  }
}
