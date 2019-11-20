import { Sorter } from "./sorter";

// string
export class CharactersCollection extends Sorter {
  constructor(public data: string) {
    super();
  }

  // get will call like collectin.length
  get length(): number {
    return this.data.length;
  }

  public compare(leftIndex: number, rightIndex: number): boolean {
    return (
      this.data[leftIndex].toLowerCase() > this.data[rightIndex].toLowerCase()
    );
  }

  public swap(leftIndex: number, rightIndex: number): void {
    const charsArr = this.data.toLowerCase().split("");
    const leftHand = charsArr[leftIndex];
    charsArr[leftIndex] = charsArr[rightIndex];
    charsArr[rightIndex] = leftHand;

    this.data = charsArr.join("");
  }
}
