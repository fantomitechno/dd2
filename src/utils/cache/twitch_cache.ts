import { getTwitchUsers } from "../api";

let lastUpdate = -1;
let cache: {
  [wsid: string]: string
} = {}

const getTwitchCacheSize = () => Object.keys(cache).length;

const populateTwitchCache = async () => {
  const data = await getTwitchUsers();
  for (const twitch of data) {
    cache[twitch.user_id] = twitch.twitch_name;
  }
}

const getTwitchForWsid = async (wsid: string) => {
  if (Date.now() - lastUpdate > 24 * 60 * 60 * 1000) {
    await populateTwitchCache();
  }

  return cache[wsid];
}

export { getTwitchCacheSize, getTwitchForWsid }