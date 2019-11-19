function absoluteValMinimization(a: number[]): number {
  const isEven = a.length % 2 === 0;
  return isEven ? a[a.length / 2 - 1] : a[Math.floor(a.length / 2)];
}

absoluteValMinimization([1, 2, 3, 4, 5, 6, 7]);
//
console.log(absoluteValMinimization([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]));
