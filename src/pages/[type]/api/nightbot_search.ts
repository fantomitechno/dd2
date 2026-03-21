import type { APIRoute } from "astro";
import { getPlayer } from "../../../utils/cache";
import { getPb } from "../../../utils/cache/pb_other_cache";

export const GET: APIRoute = async ({ url }) => {
  const username = url.searchParams.get("username");
  if (!username) {
    return new Response(
      JSON.stringify({
        message: "No username specified",
        error: true,
      }),
      { status: 200 }
    );
  }

  if (username.length < 4) {
    return new Response(
      JSON.stringify({
        message: "Username should be longer than 4 characters",
        error: true,
      }),
      { status: 200 }
    );
  }

  const result = await getPlayer(username);

  if (!result) {
    return new Response(
      JSON.stringify({
        message: `${username} never played the map, they should get up and give it a try...`,
        error: true,
      }),
      { status: 200 }
    );
  }

  const pages = url.pathname.split("/").filter((s) => s.length);
  const type = pages.length > 1 ? pages[0]! : "";
  const data = getPb(type, result);

  return new Response(JSON.stringify({ ...data, error: false }), {
    status: 200,
  });
};
