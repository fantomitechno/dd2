import { getTwitchUsers } from "../api";

let lastUpdate = -1;
let cache: {
  [display_name: string]: string;
} = {};

const getTwitchCacheSize = () => Object.keys(cache).length;

const populateTwitchCache = async () => {
  const data = await getTwitchUsers();
  for (const twitch of data) {
    cache[twitch.display_name] = twitch.twitch_name;
  }
};

const getTwitchForDisplayName = async (display_name: string) => {
  if (Date.now() - lastUpdate > 24 * 60 * 60 * 1000) {
    await populateTwitchCache();
  }

  return cache[display_name];
};

export { getTwitchCacheSize, getTwitchForDisplayName };
