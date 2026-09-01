// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { getSiteBasePath } from "./site-base-path.mjs";

// Static hosting: the site may be served from the domain root or from a
// subfolder (e.g. Fastmail hosting a build at https://dcfamily.net/new/dist/).
//
// IMPORTANT: TanStack Start bakes the router's basepath into the client
// bundle at build time via the `TSS_ROUTER_BASEPATH` define, and on every
// page load it *overwrites* whatever basepath the router was created with
// (see `hydrateStart()` in `@tanstack/start-client-core`). That means the
// basepath can NOT be reliably auto-detected at runtime (e.g. from
// `document.baseURI`) — it must match the actual deploy path here, or
// hydration throws "Invariant failed" and the whole page becomes
// non-interactive (nav, theme/language toggles, everything).
//
// Set SITE_BASE_PATH when building for a different location (see
// site-base-path.mjs — also used by scripts/prerender.mjs, keep both in sync):
//   SITE_BASE_PATH=/new/dist bun run build   (subfolder deploy, current default)
//   SITE_BASE_PATH=/ bun run build           (root deploy, e.g. dcfamily.net)
const basePath = getSiteBasePath();

export default defineConfig({
  vite: {
    // Relative to `basePath` so assets resolve correctly from that folder.
    base: process.env["NODE_ENV"] === "production" ? `${basePath}/` : "/",
  },
  tanstackStart: {
    // Keep the router's basepath in sync with the asset base above.
    router: { basepath: basePath || "/" },
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
});