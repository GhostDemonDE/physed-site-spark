import { readdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const SSR_DIR = "dist/server/_ssr";

async function findServerEntry() {
  const files = await readdir(SSR_DIR);
  const match = files.find((f) => f.startsWith("server-") && f.endsWith(".mjs"));
  if (!match) {
    throw new Error(`Server entry not found in ${SSR_DIR}`);
  }
  return join(process.cwd(), SSR_DIR, match);
}

async function main() {
  const entryPath = await findServerEntry();
  const { default: server } = await import(entryPath);

  const request = new Request("http://localhost/");
  const response = await server.fetch(request);

  if (!response.ok) {
    throw new Error(`Prerender failed with status ${response.status}`);
  }

  const html = await response.text();
  await writeFile("dist/client/index.html", html, "utf-8");
  console.log(`Prerendered / to dist/client/index.html (${html.length} bytes)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
