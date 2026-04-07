const keys = ['a','s','d','f','j','k','l',';'];

const getRandomKey = () =>
  keys[Math.floor(Math.random() * keys.length)];

const initialState = {
  currentKey: getRandomKey(),
  total: 0,
  correct: 0,
  time: 300,
  token: null,
  leaderboard: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'KEY_PRESS':
      return {
        ...state,
        total: state.total + 1,
        correct:
          action.payload === state.currentKey
            ? state.correct + 1
            : state.correct,
        currentKey: getRandomKey(),
      };

    case 'TICK':
      return {
        ...state,
        time: state.time > 0 ? state.time - 1 : 0,
      };

    case 'LOGIN_SUCCESS':
      return {...state, token: action.payload};

    case 'SET_LEADERBOARD':
      return {...state, leaderboard: action.payload};

    default:
      return state;
  }
};

export default reducer;