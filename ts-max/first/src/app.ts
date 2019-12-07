// interface
// describe structure of an object
// describe structure of a function also
// it is custom type
// implement inheritence in interfaces
interface Named {
  readonly name?: string;
  output?: string;
}
interface AnotherInterface {}
// combine interfaces = inheritance
interface Greedable extends Named, AnotherInterface {
  // name: string;
  // readonly can use on type
  readonly age?: number;
  greet(phrase: string): void;
}
// interface vs type ==> interface can only use by object
// interface use as contract
// type can store other things like union
class Person implements Greedable, AnotherInterface {
  //  optional prop on class
  name?: string;
  constructor(n?: string) {
    if (n) this.name = n;
  }

  greet(phase: string): void {
    if (this.name) console.log(phase);
    else console.log(phase + "no name");
  }
}

let user1: Greedable;
// user1 = new Person("mk");
user1 = new Person();
console.log(user1);

//

// type AddFn = (a: number, b: number) => number;
interface AddFn {
  // annonymous func not using method syntax;
  // its function type;
  // custom type also better;
  (a: number, b: number): number;
}
let adding: AddFn;
adding = (n: number, n1: number): number => {
  return n + n1;
};
