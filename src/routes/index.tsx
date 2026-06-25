import { createFileRoute } from "@tanstack/react-router";
import { Portfolio } from "@/components/portfolio/Portfolio";
import { githubQueryOptions } from "@/lib/github-query";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Iyad Eltifi | Cloud Computing, Web Systems & PageFoundry" },
      {
        name: "description",
        content:
          "Iyad Eltifi — Tampa-based cloud computing & IT student and founder of PageFoundry. Modern, fast, mobile-first websites for small businesses.",
      },
      { property: "og:title", content: "Iyad Eltifi | PageFoundry" },
      {
        property: "og:description",
        content:
          "Modern, fast, mobile-first websites for small businesses. Built by a cloud computing & IT student and PageFoundry founder.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(githubQueryOptions),
  component: Portfolio,
});
