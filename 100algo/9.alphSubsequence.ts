function alphSubsequence(str: string): boolean {
  //
  let newStr = str.toLowerCase();
  for (let i = 0; i < newStr.length; i++) {
    if (newStr.charCodeAt(i) > newStr.charCodeAt(i + 1)) {
      return false;
    }
  }
  return true;
}

console.log(alphSubsequence("ccbse")); // false
console.log(alphSubsequence("bccccccxyz")); // true
console.log(alphSubsequence("bcxzy")); // true
