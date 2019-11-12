// annotation by us
const apples: number = 5;

let speed: string = "fast";

let nonthing: null = null;
let n2: undefined = undefined;

//
let now: Date = new Date();
//
let colors: string[] = ["red", "blue"];
let myNum: number[] = [1, 3, 4, 6];
let truths: boolean[] = [true, false];

// classes
class Car {}
let car: Car = new Car();

// object
let newObj: { x: number; y: number } = {
  x: 10,
  y: 20
};

// function
const logNum: (i: number) => void = (i: number) => {
  console.log(i);
};

// why and when annotaions

// function return any, it's bad thing.
const josn = '{"x": 10, "y": 20}';
const coords: { x: number; y: number } = JSON.parse(josn);
console.log(coords);

// when we declare var but not init it
let sl: number;
sl = 3;
let words: string;

// var whose type can not infered correctly
let number = [23, -1, -3];
let numAboveZero: boolean | number = false;
for (let i = 0; i < number.length; i++) {
  if (number[i] > 0) {
    numAboveZero = number[i];
  }
}
