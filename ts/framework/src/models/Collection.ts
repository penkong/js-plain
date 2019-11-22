import { Eventing } from "./Eventing";
import axios from "axios";
import { AxiosResponse } from "axios";
// this do fetch all collection user or maybe products or ...abs

//
export class Collection<T, K> {
  // it will go to have list of all users
  // models is list of all users
  // User [] == Users
  models: T[] = [];
  events: Eventing = new Eventing();

  constructor(public url: string, public desrialize: (json: K) => T) {}

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  public fetch(): void {
    axios(this.url).then((res: AxiosResponse) => {
      res.data.forEach((val: K) => {
        this.models.push(this.desrialize(val));
      });
      this.trigger("change");
    });
  }
}
