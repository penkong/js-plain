const persons: {
  name: string;
  age: number;
  hobbies: string[];
  // it's tuple
  role: [number, string];
} = {
  name: "mk",
  age: 30,
  hobbies: ["sports", "cooking"],
  // tuple
  role: [2, "string"]
};

// for identifier human readable.
enum Role {
  ADMIN = 5, // default start from 0
  READ_ONLY, // 6
  AUTHOR // 7
}

const person = {
  name: "mk",
  age: 30,
  hobbies: ["sports", "cooking"],
  role: Role.ADMIN
};

// type object is equal to {}; as types
// ---------------------------------

function combine(n: number | string, z: number | string) {
  let res;
  if (typeof n === "number" && typeof z === "number") res = n + z;
  else res = n.toString() + z.toString();
  return res;
}

const combineAge = combine(30, 20);
// console.log(combineAge);
const combineName = combine("mk", "zed");

// ------------------------------------------
// literal types add new arg for more flexiblity
// result : 'as-number' | 'as-text'

// ============================================
// type aliases
type Combineable = number | string;
type Conversion = "as-number" | "as-text";
