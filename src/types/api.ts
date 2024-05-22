type UserLeaderboard = {
  rank: number,
  wsid: string,
  height: number,
  ts: number,
  name: string,
  update_count: number,
  colors: number[]
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

type Overview = {
  falls: number,
  falls_raw: number,
  floors_fallen: number,
  height_fallen: number,
  jumps: number,
  nb_players_climbing: number,
  nb_players_live: number,
  players: number,
  resets: number,
  sessions: number,
  ts: number
}

type TwitchUser = {
  display_name: string,
  user_id: string,
  twitch_name: string
}

type Leaderboard = UserLeaderboard[]

type LiveLeaderboard = UserLiveLeaderboard[]

type TwitchUsers = TwitchUser[]

export type { UserLeaderboard, UserLive, Leaderboard, LiveLeaderboard, Overview, TwitchUser, TwitchUsers }