import type { APIRoute } from "astro";
import { getPlayer } from "../../utils/cache";
import { getPlayerPb } from "../../utils/api";

export const GET: APIRoute = async ({ url }) => {
  return new Response(JSON.stringify({
    message: "API was disabled",
  }), { status: 500 });
  const username = url.searchParams.get("username");
  if (!username) {
    return new Response(JSON.stringify({
      message: "No username specified"
    }), { status: 400 });
  }

  if (username.length < 4) {
    return new Response(JSON.stringify({
      message: "Username should be longer than 4 characters"
    }), { status: 400 })
  }

  const result = await getPlayer(username);

  if (!result) {
    return new Response(JSON.stringify({
      message: "User not found in the first 100 pages of the leaderboard"
    }), { status: 404 });
  }

  const data = await getPlayerPb(result);

  return new Response(JSON.stringify(data), { status: 200 });
}