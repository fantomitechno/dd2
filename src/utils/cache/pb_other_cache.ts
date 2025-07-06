import type { UserLeaderboard } from "../../types/other_api";
import { addToPlayerCache } from "./player_cache";

let cache: {
  [map: string]: {
    [wsid: string]: UserLeaderboard;
  };
} = {};

const addPbToCache = (type: string, data: UserLeaderboard) => {
  if (!cache[type]) cache[type] = {};
  cache[type][data.wsid] = data;
  addToPlayerCache(data.name, data.wsid);
};

const getPb = (type: string, wsid: string) => {
  if (!cache[type]) return undefined;
  return cache[type][wsid];
};

const getPbCacheSize = (type: string) => Object.keys(cache[type] ?? {}).length;

export { addPbToCache, getPb, getPbCacheSize };
