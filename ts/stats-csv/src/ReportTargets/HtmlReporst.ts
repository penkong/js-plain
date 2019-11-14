import { OutputTarget } from "../Summary";
import fs from "fs";

export class HtmlReport implements OutputTarget {
  print(report: string): void {
    const markup = `
      <div>
        <h1>analysis output</h1>
        <div>${report}</div>
      </div>
    `;
    fs.writeFileSync("report.html", markup);
  }
}
