import { cache } from "react";
import type { QueryParams } from "next-sanity";

import { client } from "./client";

/**
 * Fetches from Sanity with Next's default caching: once per build for
 * prerendered pages and on every request in development. Next persists these
 * responses in .next/cache/fetch-cache, so the `build` script clears that
 * folder first; otherwise a redeploy would reuse old content.
 */
export function sanityFetch<const QueryString extends string>({
  query,
  params = {},
}: {
  query: QueryString;
  params?: QueryParams;
}) {
  return cachedFetch(query, JSON.stringify(params)) as unknown as Result<QueryString>;
}

// Carries Sanity typegen's per-query result type through the untyped cache.
function typedFetch<const QueryString extends string>(
  query: QueryString,
  params: QueryParams
) {
  return client.fetch(query, params);
}
type Result<QueryString extends string> = ReturnType<
  typeof typedFetch<QueryString>
>;

/**
 * Dedupes identical queries within one render, so layouts, metadata and
 * each Suspense-wrapped section can fetch what they need independently.
 * Keyed on strings because `cache` compares arguments by identity.
 */
const cachedFetch = cache((query: string, params: string) =>
  client.fetch(query, JSON.parse(params) as QueryParams)
);
