// Worst Fix Ever: Funniest Commit Message.
//
// One line of commit message for a bug fix that made everything worse.
// The line is composed from two slots — the symptom being "fixed" and
// the remedy that made things worse — then run through the gate checks
// (a single non-blank line of 1-100 characters) before it is written
// to /output/entry.txt. No randomness, no clock, no input: the same
// bytes come out on every run.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const MAX_CHARS = 100;
const OUT_DIR = process.env.OUTPUT_DIR ?? "/output";
const OUT_FILE = "entry.txt";

// The symptom the "fix" was aimed at, and the remedy that backfired.
const SYMPTOM = "duplicate emails";
const REMEDY = "deleting every user who received two";

class CommitLine {
  readonly text: string;

  private constructor(text: string) {
    this.text = text;
  }

  static compose(symptom: string, remedy: string): CommitLine {
    return new CommitLine(`fix: stop ${symptom} by ${remedy}`);
  }

  // Each gate rule as a named check, so a failure says which rule broke.
  checks(): Array<[string, boolean]> {
    return [
      ["non-empty", this.text.trim().length > 0],
      ["at most 100 characters", this.text.length <= MAX_CHARS],
      ["single line", !/[\r\n]/.test(this.text)],
      ["no leading or trailing space", this.text === this.text.trim()],
      ["reads as a fix commit", this.text.startsWith("fix:")],
      ["names the backfire", this.text.includes(" by ")],
      // The remedy must name what was sacrificed, not just "fixed it":
      // "by deleting/removing <something>" is the backfire itself.
      ["remedy names its casualty", /^fix: stop .+ by (deleting|removing) .+$/.test(this.text)],
      ["no double spaces", !/  /.test(this.text)],
    ];
  }

  assertValid(): void {
    for (const [name, passed] of this.checks()) {
      if (!passed) {
        throw new Error(`commit line fails gate check: ${name}`);
      }
    }
  }
}

function main(): void {
  const line = CommitLine.compose(SYMPTOM, REMEDY);
  line.assertValid();
  mkdirSync(OUT_DIR, { recursive: true });
  const target = join(OUT_DIR, OUT_FILE);
  writeFileSync(target, line.text, "utf8");
  console.log(`wrote ${line.text.length} chars to ${target}`);
}

main();
