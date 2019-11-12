// like array
// difference; take value of obj , in fix series ordered.
const drink = {
  color: "brown",
  carbonated: true,
  sugar: 40
};

// for not repeat this shape we use type aliases
// it is tuple.
type Drink = [string, boolean, number];

const pepsi: [string, boolean, number] = ["brown", true, 40];
const sprite: Drink = ["clear", true, 30];

// hard to grasp if we want meaning . obj is better.
const carSpec: [number, number] = [400, 3354];

const carStats = {
  hp: 500,
  weight: 4400
};
