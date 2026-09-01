import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

/**
 * Static hosting (Fastmail): the built site may live in a subfolder,
 * e.g. https://dcfamily.net/new/dist/.
 *
 * NOTE: this can't be detected at runtime (e.g. from `document.baseURI`) —
 * TanStack Start's client hydration always overwrites the router's basepath
 * with the build-time `TSS_ROUTER_BASEPATH` value on every page load. The
 * actual basepath is configured in `vite.config.ts` (`SITE_BASE_PATH` env
 * var / `tanstackStart.router.basepath`) and mirrored here via
 * `import.meta.env.BASE_URL`, which Vite derives from the same `base` config
 * option, so the two always stay in sync.
 */
export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    basepath: import.meta.env.BASE_URL,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });

  return router;
};

