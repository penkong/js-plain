function comp(array1, array2) {
  //your code here
  if (array1 != null && array2 != null && array1.length && array2.length) {
    let container = [];
    for (let i = 0; i < array2.length; i++) {
      const element = array2[i];
      if (!Number.isInteger(Math.pow(element, 1 / 2))) return false;
      container.push(Math.pow(element, 1 / 2));
    }
    for (let i = 0; i < container.length; i++) {
      const element = container[i];
      if (!array1.includes(element)) return false;
    }
    return true;
  }
  return false;
}

a1 = [121, 144, 19, 161, 19, 144, 19, 11];
a2 = [
  11 * 11,
  121 * 121,
  144 * 144,
  19 * 19,
  161 * 161,
  19 * 19,
  144 * 144,
  19 * 19
];
console.log(comp(a1, a2), true);
