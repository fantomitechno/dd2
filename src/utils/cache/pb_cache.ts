import type { UserLeaderboard } from "../../types/api";

let cache: {
  [wsid: string]: UserLeaderboard
} = {};


const addPbToCache = (data: UserLeaderboard) => {
  cache[data.wsid] = data;
}

const getPb = (wsid: string) => {
  return cache[wsid];
}

const getPbCacheSize = () => Object.keys(cache).length;

export { addPbToCache, getPb, getPbCacheSize };