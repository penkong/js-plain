import { Eventing, Cb } from "./Eventing";
import { Sync } from "./Sync";
import { Attributes } from "./Atrributes";
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
  public sync: Sync<UserProps> = new Sync<UserProps>(url);
  public attributes: Attributes<UserProps>;
  // get or set are accessors
  constructor(attrs: UserProps) {
    this.attributes = new Attributes<UserProps>(attrs);
  }

  public get on() {
    return this.events.on;
  }

  public get trigger() {
    return this.events.trigger;
  }

  public get get() {
    return this.attributes.get;
  }

  public set(update: UserProps): void {
    this.attributes.set(update);
    this.events.trigger("change");
  }

  public fetch(): void {
    const id = this.attributes.get("id");
    if (typeof id !== "number") {
      throw new Error("can not fetch without an id");
    }

    this.sync.fetch(id).then((res: AxiosResponse): void => {
      this.set(res.data);
    });
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
