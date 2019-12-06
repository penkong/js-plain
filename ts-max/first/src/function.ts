function add(n: number, n2: number): number {
  return n + n2;
}
// white type == void
function printt(res: number): void {
  console.log("result" + res);
}
// clg of void func is undefined means real value
// if we return;
// is's undefined.

// ===============================================
// function as type
let combined: Function;
let combineVals: (n: number, z: number) => number;
