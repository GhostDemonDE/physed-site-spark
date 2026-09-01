import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

/**
 * Static hosting (Fastmail): the built site may live in a subfolder,
 * e.g. https://dcfamily.net/new/dist/. Derive the router basepath from the
 * directory of the current document so the router doesn't throw "Invariant failed".
 */
function getBasepath() {
  if (typeof document === "undefined") return "/";
  try {
    return new URL(".", document.baseURI).pathname || "/";
  } catch {
    return "/";
  }
}

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    basepath: getBasepath(),
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });

  return router;
};

