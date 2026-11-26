import * as fs from "node:fs";
import * as path from "node:path";

// One original single-line joke excusing a missed deadline.
const JOKE =
  "I didn't miss the deadline \u2014 it saw my calendar, filed for custody of my free time, and won.";

// Validate the entry before writing it out.
if (JOKE.length < 1 || JOKE.length > 200) {
  throw new Error(`Entry must be 1-200 characters, got ${JOKE.length}`);
}
if (JOKE.trim().length === 0) {
  throw new Error("Entry must not be only whitespace");
}
if (JOKE !== JOKE.trim()) {
  throw new Error("Entry must not have leading or trailing whitespace");
}
if (/[\u0000-\u001F\u007F]/.test(JOKE)) {
  throw new Error("Entry must not contain control characters");
}
if (JOKE.includes("\n") || JOKE.includes("\r")) {
  throw new Error("Entry must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "entry.txt"), JOKE, "utf8");
