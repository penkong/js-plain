// you must get types for every package for let ts know to help you.
// type definition file. @types/{lib name} from definitely type project.
import faker from "faker";

export class User {
  name: string;
  location: {
    lat: number;
    lng: number;
  };

  constructor() {
    const {
      name: { firstName },
      address: { latitude, longitude }
    } = faker;
    this.name = firstName();
    this.location = {
      lat: parseFloat(latitude()),
      lng: parseFloat(longitude())
    };
  }
}
