export const START = 'START';
export const KEY_PRESS = 'KEY_PRESS';
export const TICK = 'TICK';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const SET_LEADERBOARD = 'SET_LEADERBOARD';

export const start = () => ({type: START});
export const keyPress = key => ({type: KEY_PRESS, payload: key});
export const tick = () => ({type: TICK});
export const loginSuccess = token => ({
  type: LOGIN_SUCCESS,
  payload: token,
});
export const setLeaderboard = data => ({
  type: SET_LEADERBOARD,
  payload: data,
});