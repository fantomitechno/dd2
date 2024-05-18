import type { APIRoute } from "astro";
import { getPlayer } from "../../utils/cache";
import { getPlayerPb } from "../../utils/api";

export const GET: APIRoute = async ({ url }) => {
  const username = url.searchParams.get("username");
  if (!username) {
    return new Response(JSON.stringify({
      message: "No username specified",
      error: true
    }), { status: 200 });
  }

  if (username.length < 4) {
    return new Response(JSON.stringify({
      message: "Username should be longer than 4 characters",
      error: true
    }), { status: 200 })
  }

  const result = await getPlayer(username);

  if (!result) {
    return new Response(JSON.stringify({
      message: `${username} never played the map, they should get up and give it a try...`,
      error: true
    }), { status: 200 });
  }

  const data = await getPlayerPb(result);

  return new Response(JSON.stringify({ ...data, error: false }), { status: 200 });
}