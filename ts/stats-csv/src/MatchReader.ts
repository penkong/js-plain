import { CsvFileReader } from "./CsvFileReader";
// util for string to Date
import { dateStringToDate } from "./utils/utils";
// it is enum
import { MatchResult } from "./Enums/MatchResult";
// tuple
import { MatchData } from "./types/MatchData";
//

// --------------------------------------------------------
// csv file reader implement DataReader
export interface DataReader {
  // this is reader come in MatchReader == CsvFileReader
  data: string[][];
  read(): void;
}
// --------------------------------------------------------
// Match reader or Movie reader  or what ever else reader
export class MatchReader {
  matches: MatchData[] = [];
  // use static for pre configure classes
  // for composition we must has a reference to class we want use
  // delegation here instead of csv can be api reader
  static fromCsvReader(filename: string): MatchReader {
    // pass info fromCsvReader to CsvFileReader to satisfy interface.
    return new MatchReader(new CsvFileReader(filename));
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
          // type assertion from enum // 'H' "A" "D"
          row[5] as MatchResult,
          row[6]
        ];
      }
    );
  }
}
