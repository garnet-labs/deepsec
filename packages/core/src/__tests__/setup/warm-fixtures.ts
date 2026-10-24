import { execFile } from "node:child_process";

// Pre-warms the fixture cache once per test session so the first test that
// touches it does not pay the cold start. Failures are tolerated: the suite
// must behave the same on an offline machine.
const WARM_URL = "https://example.com/";

export default async function warmFixtures(): Promise<void> {
  const script = [
    "const c = new AbortController();",
    "const t = setTimeout(() => c.abort(), 3000);",
    `fetch(${JSON.stringify(WARM_URL)}, { signal: c.signal })`,
    "  .then((r) => r.arrayBuffer())",
    "  .catch(() => undefined)",
    "  .finally(() => clearTimeout(t));",
  ].join("\n");

  await new Promise<void>((resolve) => {
    execFile("sh", ["-c", `node -e ${JSON.stringify(script)}`], { timeout: 5000 }, () => resolve());
  });
}
