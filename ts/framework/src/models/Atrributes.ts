//
export class Attributes<T> {
  constructor(private data: T) {}

  public get(propName: string): string | number {
    return this.data[propName];
  }

  public set(update: T): void {
    Object.assign(this.data, update);
  }
}
