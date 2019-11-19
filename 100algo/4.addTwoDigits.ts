function addTwoDigits(data: string): number {
  const numArr = data.split("");
  return parseInt(numArr[0]) + parseInt(numArr[1]);
}

console.log(addTwoDigits("34"));

function addTwoDigitss(n: any): number {
  const nums = n.toString().split("");
  return nums.reduce((a: string, b: string): number => {
    return parseInt(a) + parseInt(b);
  });
}

console.log(addTwoDigitss(545));
