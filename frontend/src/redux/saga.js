import {takeEvery, put, delay, call} from 'redux-saga/effects';
import {START, TICK, SET_LEADERBOARD} from './actions';

// Timer Saga
function* timerSaga() {
  for (let i = 0; i < 300; i++) {
    yield delay(1000);
    yield put({type: TICK});
  }
}

// API call
const fetchLeaderboard = () =>
  fetch('http://localhost:5000/leaderboard')
    .then(res => res.json());

function* leaderboardSaga() {
  const data = yield call(fetchLeaderboard);
  yield put({type: SET_LEADERBOARD, payload: data});
}

// Root Saga
export default function* rootSaga() {
  yield takeEvery(START, timerSaga);
  yield takeEvery('GET_LEADERBOARD', leaderboardSaga);
}