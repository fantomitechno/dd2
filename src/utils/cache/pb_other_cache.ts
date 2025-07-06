import type { UserLeaderboard } from "../../types/other_api";

let cache: {
  [map: string]: {
    [wsid: string]: UserLeaderboard;
  };
} = {};

const addPbToCache = (type: string, data: UserLeaderboard) => {
  if (!cache[type]) cache[type] = {};
  cache[type][data.wsid] = data;
};

const getPb = (type: string, wsid: string) => {
  if (!cache[type]) return null;
  return cache[type][wsid];
};

const getPbCacheSize = (type: string) => Object.keys(cache[type] ?? {}).length;

export { addPbToCache, getPb, getPbCacheSize };
