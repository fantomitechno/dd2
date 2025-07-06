type UserLeaderboard = {
  rank: number;
  wsid: string;
  pos: number[];
  ts: number;
  name: string;
  update_count: number;
  colors: number[];
  race_time: number;
};

type UserLiveLeaderboard = {
  rank: number;
  user_id: string;
  pos: number[];
  ts: number;
  display_name: string;
  height: number;
  update_count: number;
  colors: number[];
  vel: unknown;
};

type Leaderboard = UserLeaderboard[];

type LiveLeaderboard = UserLiveLeaderboard[];

export type {
  UserLeaderboard,
  UserLiveLeaderboard,
  Leaderboard,
  LiveLeaderboard,
};
