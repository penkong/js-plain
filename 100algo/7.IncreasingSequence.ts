function IncreasingSequence(arr: number[]): boolean {
  //
  let count: number = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] >= arr[i + 1]) {
      count++;
      if (count >= 2) return false;
    }
  }
  return true;
}

console.log(IncreasingSequence([1, 2, 4, 5, 3, 1])); // false
console.log(IncreasingSequence([1, 2, 4, 5, 3])); // true
console.log(IncreasingSequence([1, 4, 5, 9, 3, 1])); // false
console.log(IncreasingSequence([1, 4, 3, 9]));
console.log(IncreasingSequence([1, 4, 3, 1, 9]));
