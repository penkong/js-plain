import { CsvReader } from "./CsvReader";
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
// reader give us matches for analysis
