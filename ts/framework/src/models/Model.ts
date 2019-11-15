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
//
// this is type alias
type Cb = () => void;
//

export class Model<T extends HasId> {
  // get or set are accessors
  constructor(
    private attributes: ModelAttributes<T>,
    private events: Events,
    private sync: Sync<T>
  ) {}
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
