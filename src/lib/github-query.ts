import { queryOptions } from "@tanstack/react-query";
import { getGitHubData } from "./github.functions";

export const githubQueryOptions = queryOptions({
  queryKey: ["github", "ie04"],
  queryFn: () => getGitHubData(),
  staleTime: 5 * 60 * 1000,
});
