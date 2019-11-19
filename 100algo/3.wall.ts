function addBorder(pic: string[]): string[] {
  let wall = "*".repeat(pic[0].length + 2);
  pic.unshift(wall);
  pic.push(wall);

  for (let i = 1; i < pic.length - 1; i++) {
    pic[i] = "*".concat(pic[i], "*");
  }

  return pic;
}

console.log(addBorder(["added", "dedeed"]));
