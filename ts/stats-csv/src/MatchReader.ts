import { dateStringToDate } from "./utils";
// it is enum
import { MatchResult } from "./MatchResult";
import { CsvReader } from "./CsvReader";
//
type MatchData = [Date, string, string, number, number, MatchResult, string];

//
export class MatchReader extends CsvReader<MatchData> {
  data: MatchData[] = [];

  mapRow(row: string[]): MatchData {
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
}
