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

/// we go turn this to abstract class to let other classes use it as
// parent
// abstract class can not use to create object
// abstract class  only use as parent , can have methods also
// abstract class  can reference methods that does not exitst but in child
// but still need to provide names of those methods
// child classes must promise will do it.

export abstract class Sorter {
  // we say eventually will have these methods;
  abstract length: number;
  abstract compare(leftIndex: number, rightIndex: number): boolean;
  abstract swap(leftIndex: number, rightIndex: number): void;
  //
  public sort(): void {
    const { length } = this;
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length - i - 1; j++) {
        if (this.compare(j, j + 1)) {
          this.swap(j, j + 1);
        }
      }
    }
  }
}

// interfacce vs abstract
// for dissimlar obj to work together
// loosly coupled

// for build up a definition of an object
// strongly coupled
