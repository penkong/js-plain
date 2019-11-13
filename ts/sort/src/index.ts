// how can teach ts to figure how code run by tsconfig.json
// ts --init
// after that config in command line only type >> tsc and file will transpile
// tsc -w
// ----------------------------------------------------------------
import { Sorter } from "./sorter";
import { NumbersCollection } from "./NumbersCollection";
import { CharactersCollection } from "./CharactersCollection";
import { LinkedListCollection } from "./LinkedListCollection";
//
// const sorter = new Sorter(numbersCollection);
const numbersCollection = new NumbersCollection([10, 3, -5, 0]);
numbersCollection.sort();
console.log(numbersCollection.data);
//
// const charactersCollection = new CharactersCollection("fsdfsdfFsS");
//
// const linkedListCollection = new LinkedListCollection();
// linkedListCollection.add(500);
// linkedListCollection.add(50);
// linkedListCollection.add(-10);
// linkedListCollection.add(-20);

// linkedListCollection.print();
