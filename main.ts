// Entry program for the make.fun bounty "Five Seconds to Explain the Glass".
// Writes the cat's one-sentence defence to <output dir>/entry.txt.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const defence =
  "The table is mine, the glass was trespassing in my sunbeam, and the floor has accepted my ruling.";

// Mirror of the bounty gate: 1-200 characters, never whitespace-only,
// and no trailing newline. Fail loudly here rather than ship an entry
// the gate would refuse.
function assertGateReady(text: string): void {
  const chars = [...text].length;
  if (chars < 1 || chars > 200) {
    throw new Error(`entry must be 1-200 characters, got ${chars}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only white space");
  }
  if (text.endsWith("\n") || text.endsWith("\r")) {
    throw new Error("entry must not end with a newline");
  }
}

assertGateReady(defence);

const outputDir = process.env.MAKEFUN_OUTPUT_DIR || "out";

mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), defence, "utf8");
