import type { APIRoute } from "astro";
import type { Leaderboard } from "../../types/api";
import { getRoute } from "../../utils/cache";
import { quickSimilarity, similarity } from "../../utils/similarity";

const ROUTE = "https://dips-plus-plus.xk.io/leaderboard/global";

export const GET: APIRoute = async ({ url }) => {
  const username = url.searchParams.get("username");
  if (!username) {
    return new Response(JSON.stringify({ message: "No username specified" }), { status: 400 });
  }

  let lb: Leaderboard = await getRoute(ROUTE);

  let result = lb.find(p => similarity(p.name, username) > 0.8 || quickSimilarity(p.name, username));

  let i = 1;
  while (result == null && lb.find(p => p.height > 3) && i < 100) {
    lb = await getRoute(ROUTE + `/${i}`);
    result = lb.find(p => similarity(p.name, username) > 0.8 || quickSimilarity(p.name, username));
    i++;
  }

  if (!result) {
    return new Response(JSON.stringify({
      message: "User not found in the first 100 pages of the leaderboard"
    }), { status: 404 });
  }

  return new Response(JSON.stringify(result), { status: 200 });
}