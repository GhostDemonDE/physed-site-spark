// Single source of truth for where the site is deployed, shared by
// vite.config.ts (asset base + router basepath) and scripts/prerender.mjs
// (which route URL to prerender). Keeping this in one place avoids the two
// getting out of sync, which causes prerender to 307-redirect instead of
// rendering the page.
//
// Override at build time with SITE_BASE_PATH:
//   SITE_BASE_PATH=/new/dist bun run build   (subfolder deploy)
//   SITE_BASE_PATH=/ bun run build           (root deploy, e.g. dcfamily.net)
export function getSiteBasePath() {
  return (process.env["SITE_BASE_PATH"] ?? "/new/dist").replace(/\/+$/, "");
}
