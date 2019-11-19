function sumSame(arr: number[]): number[] {
  //
  let final: number[] = [];
  let evens = 0;
  let odds = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] % 2 === 0) {
      evens += arr[i];
    } else {
      odds += arr[i];
    }
  }
  final.push(evens);
  final.push(odds);
  return final;
}

console.log(sumSame([10, 25, 20, 33, 30, 39, 40, 47, 50]));
console.log(sumSame([8, 25, 18, 33, 30, 39, 22, 47, 38]));
