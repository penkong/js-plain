function add(a: number, b: number): number {
  return a + b;
}

add(1, 3);
console.log(add(1, 3));

function addRest(...numb: number[]): number {
  let total = 0;
  numb.forEach(el => {
    total += el;
  });
  return total;
}

const t = addRest(2, 3, 4, 5, 6, 7);
console.log(t);
