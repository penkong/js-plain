// interface is structure of an object

//
export class Attributes<T> {
  constructor(private data: T) {}
  // type assertion ===>> (as number) or (as sth)
  // in ts strings are Types like "age"
  public getAll(): T {
    return this.data;
  }

  // this is generic constraints ------- object lookup
  public get = <K extends keyof T>(key: K): T[K] => {
    return this.data[key];
  };

  public set(update: T): void {
    Object.assign(this.data, update);
  }
}
