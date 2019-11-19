function adjacentMultiple(arr: number[]): number {
  //
  let max: number = arr[0] * arr[1];
  for (let i = 1; i < arr.length - 1; i++) {
    let curr = arr[i] * arr[i + 1];
    if (curr > max) {
      max = curr;
    }
  }
  return max;
}

console.log(adjacentMultiple([3, 5, 8, -9, -9, 11]));
