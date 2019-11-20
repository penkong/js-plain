function shiftArr(arr: number[]): number {
  //
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] >= arr[i + 1]) {
      const diff = arr[i] + 1 - arr[i + 1];
      count += diff;
      arr[i + 1] = diff + arr[i + 1];
    }
  }
  console.log(arr);
  return count;
}

// console.log(shiftArr([1, 1, 1])); //3
// console.log(shiftArr([1, 1, 1, 4, 5, 6])); //3
// console.log(shiftArr([1, 1, 1, 2, 2, 2, 2, 4, 5])); //3
console.log(shiftArr([1, 1, 3, 6, 3, 1, 1, 1, 3, 3, 0])); //3
