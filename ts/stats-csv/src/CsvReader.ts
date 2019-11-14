import fs from "fs";
// it is enum

export class CsvReader {
  data: string[][] = [];

  constructor(public filename: string) {}

  public read(): void {
    this.data = fs
      .readFileSync(this.filename, {
        encoding: "utf-8"
      })
      .split("\n")
      .map((row: string): string[] => {
        return row.split(",");
      });
  }
}
