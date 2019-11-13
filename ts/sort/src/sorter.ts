//
// type guard check on to clarify type of value we work on ==
//instanceOf for any other value
// in ts typeOf  is only for number string boolean symbol
export interface Sortable {
  length: number;
  compare(leftIndex: number, rightIndex: number): boolean;
  swap(leftIndex: number, rightIndex: number): void;
}

//
// collection: number[];

// constructor(collection: number[]) {
//   this.collection = collection;
// }
export class Sorter {
  constructor(public collection: Sortable) {}

  public sort(): void {
    const { length } = this.collection;
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length - i - 1; j++) {
        if (this.collection.compare(j, j + 1)) {
          this.collection.swap(j, j + 1);
        }
      }
    }
  }
}
