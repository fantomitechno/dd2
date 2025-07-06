import type { Leaderboard, LiveLeaderboard } from "../types/other_api";
import type { GobalLiveHeight } from "../types/internal_api";
import { addPbToCache, getPb } from "./cache/pb_other_cache";
import { getRoute } from "./cache";

const maps: { [name: string]: string } = {
  slip: "DeepSlip_1fwwLrYCb7Ku7Tqcl0",
};

const getLeaderboardPage = async (type: string, page: number) => {
  const ROUTE =
    "https://dips-plus-plus.xk.io/map/" + maps[type] + "/leaderboard/" + page;

  console.log(ROUTE);
  const data: Leaderboard = await getRoute(ROUTE);

  data.forEach((v) => addPbToCache(type, v));

  return data.sort((a, b) => a.rank - b.rank);
};

const getLiveGlobalHeight = async (type: string): Promise<GobalLiveHeight> => {
  const ROUTE =
    "https://dips-plus-plus.xk.io/map/" + maps[type] + "/live_heights";

  const data: LiveLeaderboard = await getRoute(ROUTE);

  return data
    .sort((a, b) => b.height - a.height)
    .filter((p) => p.height > 30 && p.rank <= 100)
    .map((p) => {
      const pb = getPb(type, p.user_id);
      return {
        ...p,
        pbRank: pb?.rank,
        pbHeight: pb?.pos[2] || 0,
      };
    });
};

export { getLeaderboardPage, getLiveGlobalHeight };
