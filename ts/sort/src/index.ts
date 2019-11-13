// how can teach ts to figure how code run by tsconfig.json
// ts --init
// after that config in command line only type >> tsc and file will transpile
// tsc -w
// ----------------------------------------------------------------
import { Sorter } from "./sorter";
import { NumbersCollection } from "./NumbersCollection";
import { CharactersCollection } from "./CharactersCollection";
//
const numbersCollection = new NumbersCollection([10, 3, -5, 0]);
const sorter = new Sorter(numbersCollection);
sorter.sort();
console.log(numbersCollection.data);
const charactersCollection = new CharactersCollection("fsdfsdfFsS");
const sorterString = new Sorter(charactersCollection);
sorterString.sort();
console.log(charactersCollection.data);
