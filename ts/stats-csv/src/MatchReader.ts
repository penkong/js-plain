import { dateStringToDate } from "./utils/utils";
// it is enum
import { MatchResult } from "./Enums/MatchResult";
import { MatchData } from "./types/MatchData";
import { CsvReader } from "./CsvReader";
//

export interface DataReader {
  read(): void;
  data: string[][];
}

//
export class MatchReader {
  matches: MatchData[] = [];
  // use static for pre configure classes
  static fromCsv(filename: string): MatchReader {
    return new MatchReader(new CsvReader(filename));
  }
  // this.reader
  constructor(public reader: DataReader) {}

  load(): void {
    this.reader.read();
    this.matches = this.reader.data.map(
      (row: string[]): MatchData => {
        return [
          dateStringToDate(row[0]),
          row[1],
          row[2],
          parseInt(row[3]),
          parseInt(row[4]),
          // type assertion // 'H' "A" "D"
          row[5] as MatchResult,
          row[6]
        ];
      }
    );
  }
}
