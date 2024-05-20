import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  return new Response(JSON.stringify({
    message: "API was disabled",
  }), { status: 500 });
}