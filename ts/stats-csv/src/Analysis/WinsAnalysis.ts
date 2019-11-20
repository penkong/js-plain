import { Analyzer } from "../Summary";
import { MatchData } from "../types/MatchData";
import { MatchResult } from "../Enums/MatchResult";
//
// analyzer is a interface
export class WinAnalysis implements Analyzer {
  constructor(public team: string) {}

  run(matches: MatchData[]): string {
    let wins = 0;
    for (let match of matches) {
      if (match[1] === this.team && match[5] === MatchResult.HomeWin) {
        wins++;
      } else if (match[2] === this.team && match[5] === MatchResult.AwayWin) {
        wins++;
      }
    }
    return `team ${this.team} won ${wins} games`;
  }
}
