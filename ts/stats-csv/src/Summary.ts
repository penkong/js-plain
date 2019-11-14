import { MatchData } from "./types/MatchData";
import { WinAnalysis } from "./Analysis/WinsAnalysis";
import { HtmlReport } from "./ReportTargets/HtmlReporst";
//

export interface Analyzer {
  run(matches: MatchData[]): string;
}

export interface OutputTarget {
  print(report: string): void;
}

//
export class Summary {
  constructor(public analyzer: Analyzer, public outputTarget: OutputTarget) {}
  // static methods can call on class itself
  static winAnalysisWithReport(team: string): Summary {
    return new Summary(new WinAnalysis(team), new HtmlReport());
  }
  buildAndPringReport(matches: MatchData[]): void {
    const output = this.analyzer.run(matches);
    this.outputTarget.print(output);
  }
}
