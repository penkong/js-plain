// you must get types for every package for let ts know to help you.
// type definition file. @types/{lib name} from definitely type project.
import faker from "faker";
import { Mappable } from "./Map";

export class Company implements Mappable {
  companyName: string;
  catchPhrase: string;
  location: {
    lat: number;
    lng: number;
  };

  constructor() {
    const {
      company: { companyName, catchPhrase },
      address: { latitude, longitude }
    } = faker;
    this.companyName = companyName();
    this.catchPhrase = catchPhrase();
    this.location = {
      lat: parseFloat(latitude()),
      lng: parseFloat(longitude())
    };
  }

  public markerContent(): string {
    return `User name : ${this.companyName} and catchPhraase: ${this.catchPhrase}`;
  }
}
