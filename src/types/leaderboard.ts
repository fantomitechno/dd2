type UserLeaderboard = {
  rank: number,
  wsid: string,
  height: number,
  ts: number,
  name: string,
  update_count: number
}

type UserLive = {
  display_name: string,
  user_id: string,
  last_5_points: number[][]
}

type UserLiveLeaderboard = {
  display_name: string,
  user_id: string,
  height: number,
  ts: number,
  rank: number
}

type Leaderboard = UserLeaderboard[]

type LiveLeaderboard = UserLiveLeaderboard[]

export type { UserLeaderboard, UserLive, Leaderboard, LiveLeaderboard }