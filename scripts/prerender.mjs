import { readdir, writeFile, mkdir, cp, rm } from "node:fs/promises";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { getSiteBasePath } from "../site-base-path.mjs";

const SSR_DIR = ".output/server/_ssr";

// Every route that needs a static HTML file so direct links / page refreshes
// work on plain static hosting (no server-side routing). Add new routes here.
const ROUTES = ["/", "/geistbrau"];

async function findServerEntry() {
  const files = await readdir(SSR_DIR);
  const match = files.find((f) => f.startsWith("server-") && f.endsWith(".mjs"));
  if (!match) {
    throw new Error(`Server entry not found in ${SSR_DIR}`);
  }
  return join(process.cwd(), SSR_DIR, match);
}

async function prerenderRoute(server, basePath, route) {
  const request = new Request(`http://localhost${basePath}${route}`);
  const response = await server.fetch(request);

  if (!response.ok) {
    throw new Error(`Prerender failed for ${route} with status ${response.status}`);
  }

  let html = await response.text();

  // TanStack Start's <Scripts/> manifest hardcodes a leading "/" before the
  // relative base ("./"), producing "/./assets/..." which browsers resolve
  // as an absolute path from the domain/filesystem root instead of a path
  // relative to the current folder. This breaks hydration (and therefore
  // every onClick handler, e.g. the theme/language toggles) whenever the
  // site is opened via file:// or hosted outside the domain root. Fix it up
  // to a proper relative path so asset loading always matches the folder
  // the HTML file was served/opened from.
  html = html.replaceAll('"/./assets/', '"./assets/');

  const outDir = route === "/" ? ".output/public" : `.output/public${route}`;
  await mkdir(outDir, { recursive: true });
  const outFile = join(outDir, "index.html");
  await writeFile(outFile, html, "utf-8");
  console.log(`Prerendered ${route} to ${outFile} (${html.length} bytes)`);
}

async function main() {
  const entryPath = await findServerEntry();

  // Конвертируем путь Windows в URL file:///
  const entryUrl = pathToFileURL(entryPath).href;
  const { default: server } = await import(entryUrl);

  // Must match `tanstackStart.router.basepath` in vite.config.ts (both derive
  // from the same getSiteBasePath()), otherwise the server 307-redirects
  // instead of rendering the page.
  const basePath = getSiteBasePath();

  for (const route of ROUTES) {
    await prerenderRoute(server, basePath, route);
  }

  // Копируем сгенерированный сайт в папку dist после создания index.html
  // (clean first so stale hashed assets from previous builds don't pile up)
  await rm("dist", { recursive: true, force: true });
  await cp(".output/public", "dist", { recursive: true });
  console.log("Static site copied to /dist folder");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});