import type { Leaderboard } from "../types/api";
import { quickSimilarity, similarity } from "./similarity";

let cache: {
  [route: string]: {
    timestamp: number,
    data: any
  }
} = {};

let lastPlayerCacheUpdate = -1;
let playerCache: {
  [name: string]: string
} = {};

const headers = new Headers({
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'User-Agent': 'dd2.renoux.dev'
});

const getRoute = async (route: string, text: boolean = false, cacheTime = 1000 * 20): Promise<any> => {
  if (cache[route] && Date.now() - cache[route]!.timestamp < cacheTime) {
    return cache[route]!.data;
  }

  const response = await fetch(route, { headers });
  if (!response.ok) {
    cache[route] = { timestamp: Date.now(), data: null };
    return null
  };
  const data = text ? await response.text() : await response.json();
  cache[route] = { timestamp: Date.now(), data };
  return data;
}


const ROUTE = (page: number) => `https://dips-plus-plus.xk.io/leaderboard/global/${page}`;

const populatePlayerCache = async () => {
  const promises = [];

  for (let i = 0; i < 100; i++) {
    promises.push(getRoute(ROUTE(i), false, 60 * 1000));
  }

  const bigLb: Leaderboard[] = await Promise.all(promises);

  for (const lb of bigLb) {
    for (const player of lb) {
      playerCache[player.name] = player.wsid;
    }
  }

  lastPlayerCacheUpdate = Date.now();
}

const getPlayer = async (playerName: string) => {
  if (Date.now() - lastPlayerCacheUpdate > 60 * 1000) {
    await populatePlayerCache();
  }

  const foundUsername = Object.keys(playerCache).find(p => similarity(p, playerName) > 0.8 || quickSimilarity(p, playerName));

  if (!foundUsername) return null;
  return playerCache[foundUsername];
}

export { getRoute, getPlayer };