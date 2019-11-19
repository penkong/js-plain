function largestString(arr: string[]): string[] {
  //
  let max = arr[0].length;
  let final: string[] = [];
  for (let i = 1; i < arr.length; i++) {
    let curr = arr[i].length;
    if (curr === max) {
      final.push(arr[i]);
    } else if (curr > max) {
      final = [];
      max = curr;
      final.push(arr[i]);
    }
  }
  return final;
}

console.log(
  largestString(["vdfs", "ssssss", "sdfs", "fsfsf", "fasfds", "fdfsff"])
);
