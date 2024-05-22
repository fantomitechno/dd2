type LiveHeight = {
  pbRank: number | undefined;
  pbHeight: number | undefined;
  display_name: string;
  user_id: string;
  height: number;
  ts: number;
  rank: number;
};

type PlayerData = {
  name: string;
  wsid: string;
  twitchUser: string | undefined;
  pbRank: number;
  pbHeight: number;
  pbTs: number;
  connected: boolean;
  liveRank: number;
  liveHeight: number | undefined;
  liveTs: number | undefined;
}

type GobalLiveHeight = LiveHeight[];

export type { LiveHeight, GobalLiveHeight, PlayerData }