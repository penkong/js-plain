function arrChange(arr: number[]): number[] {
  //
  let sum = 0;
  let multi = 1;
  let finalArr: number[] = [];
  for (let i = 0; i < arr.length; i++) {
    if (i % 2 === 0) {
      sum += arr[i];
    } else {
      multi *= arr[i];
    }
  }
  finalArr.push(sum);
  finalArr.push(multi);
  return finalArr;
}

console.log(arrChange([1, 3, 4, 5, 7, 3, 1, 4, 7]));
