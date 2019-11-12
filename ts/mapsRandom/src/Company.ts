// you must get types for every package for let ts know to help you.
// type definition file. @types/{lib name} from definitely type project.
import faker from "faker";

export class Company {
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
}
