import { AxiosResponse, AxiosError, AxiosPromise } from "axios";
// use multi interface for fields of Model to let reuse pattern
// like func and class interfaces also can be generic
interface ModelAttributes<T> {
  getAll(): T;
  get<K extends keyof T>(key: K): T[K];
  set(update: T): void;
}

interface Sync<T> {
  fetch(id: number): AxiosPromise;
  save(data: T): AxiosPromise;
}

interface Events {
  on(eventName: string, cb: Cb): void;
  trigger(eventName: string): void;
}
// type constraint
interface HasId {
  id?: number;
}
// this is type alias
type Cb = () => void;
//
export class Model<T extends HasId> {
  // get or set are accessors
  // ----- remember after transpile class to func constructor exec after
  // all methods if we use init that before constructor but if we define fields initially
  // inside constructor we can use shorter syntax, therefor consider if you use  it.
  constructor(
    private attributes: ModelAttributes<T>,
    private events: Events,
    private sync: Sync<T>
  ) {}

  // ----------EVENTING-----------
  // public get on() {
  //   return this.events.on;
  // }
  // if we assign real class in constructor we can not use  this shorter
  // syntax but because of interfce we can do it becsue it is initialization
  on = this.events.on;

  trigger = this.events.trigger;

  // ---------ATTRIBUTES-------------
  get = this.attributes.get;

  public set(update: T): void {
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
    // exec
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
