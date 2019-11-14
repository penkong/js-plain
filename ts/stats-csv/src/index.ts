import { CsvReader } from "./CsvReader";
import { MatchResult } from "./MatchResult";
import { MatchReader } from "./MatchReader";
// -----------------------------------------
// ENUM = ENUMERATION an object that store some closely vars
// it signals these values are closely related
// it's type also
// when we know all possible values.
const csv = new CsvReader("football.csv");
const reader = new MatchReader(csv);
// load after that can read data .matches
reader.load();

let manUnWins = 0;

for (let match of reader.matches) {
  if (match[1] === "Man United" && match[5] === MatchResult.HomeWin) {
    manUnWins++;
  } else if (match[2] === "Man United" && match[5] === MatchResult.AwayWin) {
    manUnWins++;
  }
}
console.log(manUnWins);
