import { Eventing, Cb } from "./Eventing";
import { Attributes } from "./Atrributes";
import { Sync } from "./Sync";
import { AxiosResponse, AxiosError } from "axios";

//
export interface UserProps {
  name?: string;
  age?: number;
  id?: number;
}

const url = "http://localhost:3000/users";
//
export class User {
  public events: Eventing = new Eventing();
  public attributes: Attributes<UserProps>;
  public sync: Sync<UserProps> = new Sync<UserProps>(url);
  // get or set are accessors
  constructor(attrs: UserProps) {
    this.attributes = new Attributes<UserProps>(attrs);
  }
  // ----------EVENTING-----------
  public get on() {
    return this.events.on;
  }

  public get trigger() {
    return this.events.trigger;
  }
  // ---------ATTRIBUTES-------------
  public get get() {
    return this.attributes.get;
  }

  public set(update: UserProps): void {
    this.attributes.set(update);
    this.events.trigger("change");
  }
  // --------SYNC------------
  public fetch(): void {
    const id = this.attributes.get("id");
    // if there is no id , undefined null
    if (typeof id !== "number") {
      throw new Error("can not fetch without an id");
    }

    this.sync
      .fetch(id)
      .then((res: AxiosResponse): void => {
        // set and trigger change
        this.set(res.data);
      })
      .catch((err: AxiosError): void => console.log(err));
  }

  public save(): void {
    this.sync
      .save(this.attributes.getAll())
      .then((res: AxiosResponse): void => {
        this.trigger("save");
      })
      .catch((err: AxiosError): void => console.log(err));
  }
}
