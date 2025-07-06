import type { UserLeaderboard } from "../../types/api";
import { addToPlayerCache } from "./player_cache";

let cache: {
  [wsid: string]: UserLeaderboard;
} = {};

const addPbToCache = (data: UserLeaderboard) => {
  cache[data.wsid] = data;
  addToPlayerCache(data.name, data.wsid);
};

const getPb = (wsid: string) => {
  return cache[wsid];
};

const getPbCacheSize = () => Object.keys(cache).length;

export { addPbToCache, getPb, getPbCacheSize };
