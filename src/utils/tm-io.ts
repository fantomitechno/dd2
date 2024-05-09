import { Client } from "trackmania.io";

const client = new Client();

client.setUserAgent(`dd2.renoux.dev`);

const getUserInfo = async (id: string) => {
  return await client.players.get(id);
}

export { getUserInfo }