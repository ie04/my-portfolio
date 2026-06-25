import { getGitHubData } from "@/lib/github";

export const dynamic = "force-dynamic";

export async function GET() {
  const data = await getGitHubData();

  return Response.json(data, {
    headers: {
      "Cache-Control": "private, max-age=0, s-maxage=300",
    },
  });
}
