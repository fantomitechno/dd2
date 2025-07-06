import { getLeaderboardPage } from "../api";
import { similarity, quickSimilarity } from "../similarity";

let lastUpdate = -1;
let cache: {
  [name: string]: string;
} = {};

const getPlayerCacheSize = () => Object.keys(cache).length;

const addToPlayerCache = (name: string, wsid: string) => {
  if (!cache[name]) {
    cache[name] = wsid;
  }
};

const populatePlayerCache = async () => {
  const promises = [];

  for (let i = 0; i <= 150; i++) {
    promises.push(getLeaderboardPage(i));
  }

  const bigLb = await Promise.all(promises);

  for (const lb of bigLb) {
    for (const player of lb) {
      cache[player.name] = player.wsid;
    }
  }

  lastUpdate = Date.now();
};

const getPlayer = async (playerName: string) => {
  if (Date.now() - lastUpdate > 24 * 60 * 60 * 1000) {
    await populatePlayerCache();
  }

  var exactMatch = Object.keys(cache).find(
    (name) => name.toLowerCase() == playerName
  );

  if (exactMatch) {
    return cache[exactMatch];
  }

  const foundUsername = Object.keys(cache).filter(
    (p) => similarity(p, playerName) > 0.8 || quickSimilarity(p, playerName)
  );

  if (!foundUsername.length) return null;

  const bestMatch = foundUsername.sort(
    (a, b) => similarity(b, playerName) - similarity(a, playerName)
  )[0] as string;
  return cache[bestMatch];
};

export { getPlayer, getPlayerCacheSize, addToPlayerCache };
