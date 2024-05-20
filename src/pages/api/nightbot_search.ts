import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ url }) => {
  return new Response(JSON.stringify({
    message: "API was disabled",
    error: true,
  }), { status: 200 });
}