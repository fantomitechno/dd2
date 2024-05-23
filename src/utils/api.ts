import type { Leaderboard, LiveLeaderboard, TwitchUsers, UserLeaderboard, UserLive } from "../types/api";
import type { GobalLiveHeight, PlayerData } from "../types/internal_api";
import { addPbToCache, getPb, getRoute } from "./cache";
import { getTwitchForWsid } from "./cache/twitch_cache";
import { Queue } from "./queue";

const getLeaderboardPage = async (page: number) => {
  const ROUTE = "https://dips-plus-plus.xk.io/leaderboard/global/" + page;

  const data: Leaderboard = await getRoute(ROUTE);

  data.forEach(v => addPbToCache(v));

  return data.sort((a, b) => a.rank - b.rank);
}

const getPlayerPb = async (wsid: string) => {
  const PB_ROUTE = "https://dips-plus-plus.xk.io/leaderboard/" + wsid;
  const dataPb: UserLeaderboard = await getRoute(PB_ROUTE);

  if (dataPb) addPbToCache(dataPb);

  return dataPb;
}

const pbQueue = new Queue(getPlayerPb)

const getLiveGlobalHeight = async (): Promise<GobalLiveHeight> => {
  const ROUTE = "https://dips-plus-plus.xk.io/live_heights/global";

  const data: LiveLeaderboard = await getRoute(ROUTE);

  return data
    .sort((a, b) => b.height - a.height)
    .filter((p) => p.height > 30 && p.rank <= 100)
    .map(p => {
      const pb = getPb(p.user_id);
      if (!pb) {
        pbQueue.add(p.user_id);
      }
      return {
        ...p,
        pbRank: pb?.rank,
        pbHeight: pb?.height
      }
    });
}

const getPlayerData = async (wsid: string): Promise<PlayerData> => {
  const dataPb = await getPlayerPb(wsid);

  const LIVE_ROUTE = "https://dips-plus-plus.xk.io/live_heights/" + wsid;

  const dataLive: UserLive = await getRoute(LIVE_ROUTE);

  const connected = dataLive.last_5_points.length != 0 && Date.now() - dataLive.last_5_points[0]![1]! * 1000 < 10 * 60 * 1000;

  let liveRank = 0;
  if (connected) {
    const GLOBAL_ROUTE = "https://dips-plus-plus.xk.io/live_heights/global";
    const dataGlobal: LiveLeaderboard = await getRoute(GLOBAL_ROUTE);
    const data = dataGlobal.find((p) => p.user_id == wsid);
    if (data) liveRank = data.rank;
  }

  const twitch = await getTwitchForWsid(wsid);

  return {
    name: dataPb.name,
    wsid: wsid,
    twitchUser: twitch,
    pbRank: dataPb.rank,
    pbHeight: dataPb.height,
    pbTs: dataPb.ts,
    connected,
    liveRank,
    liveHeight: dataLive.last_5_points[0]?.at(0), // I use "at" because using ?[0] make the ts thinking it's a "cond ? true : false" smh
    liveTs: dataLive.last_5_points[0]?.at(1)
  }
}

const getTwitchUsers = async () => {
  const ROUTE = "https://dips-plus-plus.xk.io/twitch/list";
  const data: TwitchUsers = await getRoute(ROUTE);
  return data;
}

export { getLeaderboardPage, getLiveGlobalHeight, getPlayerData, getPlayerPb, getTwitchUsers }