// import { CsvReader } from "./CsvReader";
import { MatchReader } from "./MatchReader";
// import { WinAnalysis } from "./Analysis/WinsAnalysis";
// import { ConsoleReports } from "./ReportTargets/ConsoleReports";
import { Summary } from "./Summary";
// import { HtmlReport } from "./ReportTargets/HtmlReporst";
// -----------------------------------------
// ENUM = ENUMERATION an object that store some closely vars
// it signals these values are closely related
// it's type also
// when we know all possible values.
const reader = MatchReader.fromCsv("football.csv");
// reader give us matches for analysis
// const summary = new Summary(new WinAnalysis("Man United"), new HtmlReport());
const summary = Summary.winAnalysisWithReport("Man United");
// load after that can read data .matches
reader.load();
summary.buildAndPringReport(reader.matches);
