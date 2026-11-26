// The Houseplant Out-of-Office — make.fun bounty entry.
//
// The program writes one out-of-office auto-reply, as if a houseplant
// had written it, to /output/entry.txt. The gate allows 1 to 120
// UTF-8 characters, so the reply is kept short and the length is
// checked before writing.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The reply, in the voice of a fern whose owner has gone away and
// forgotten the watering can. The joke is the plant's own life:
// no water, no replies, just a plea for help instead of email.
const REPLY =
  "Out of office — my human went on holiday and forgot to water me. Send help, not emails.";

// The bounty gate: 1 to 120 characters, not only whitespace.
if (REPLY.length < 1 || REPLY.length > 120 || REPLY.trim().length === 0) {
  throw new Error(`Reply is ${REPLY.length} characters; gate needs 1-120.`);
}

const outPath = "/output/entry.txt";
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, REPLY, "utf8");

// Read it back: the file on disk must be byte-for-byte the reply,
// with no trailing newline sneaking in, so the gate sees exactly
// the 87 characters we checked above.
const written = readFileSync(outPath, "utf8");
if (written !== REPLY) {
  throw new Error("Written entry does not match the reply.");
}
console.log(`Wrote ${REPLY.length} characters to ${outPath}`);
