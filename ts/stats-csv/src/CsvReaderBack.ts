import fs from "fs";
// it is enum
import { MatchResult } from "./MatchResult";
//
type MatchData = [Date, string, string, number, number, MatchResult, string];

//
export abstract class CsvReader<T> {
  // generics like func args but for types
  data: T[] = [];

  constructor(public filename: string) {}

  abstract mapRow(row: string[]): T;

  public read(): void {
    this.data = fs
      .readFileSync(this.filename, {
        encoding: "utf-8"
      })
      .split("\n")
      .map((row: string): string[] => row.split(","))
      .map(this.mapRow);
  }
}
