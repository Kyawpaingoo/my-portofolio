import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // Pages are statically generated and revalidated by tag, so read fresh data.
  useCdn: false,
});
