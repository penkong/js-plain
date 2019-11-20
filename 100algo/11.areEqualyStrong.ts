function areEqualyStrong(
  myLeft: number,
  myRight: number,
  yourLeft: number,
  yourRight: number
): boolean {
  //
  if (myLeft + myRight === yourLeft + yourRight) return true;
  else if (myLeft > myRight && (myLeft === yourLeft || myLeft === yourRight)) {
    return true;
  } else if (
    myRight > myLeft &&
    (myRight === yourLeft || myRight === yourRight)
  ) {
    return true;
  }
  return false;
}

console.log(areEqualyStrong(15, 10, 15, 10)); // true
console.log(areEqualyStrong(10, 15, 15, 10)); // true
console.log(areEqualyStrong(10, 15, 10, 10)); // false
console.log(areEqualyStrong(12, 9, 10, 12)); // true
