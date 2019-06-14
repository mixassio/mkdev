import { createSlice } from "redux-starter-kit";
import { combineReducers } from "redux";

import _ from "lodash";

const randomInRange = (min: number, max: number): number =>
  Math.round(Math.random() * (max - min) + min);

const dicePair = createSlice({
  slice: "dicePair",
  initialState: [1, 1],
  reducers: {
    newQuestion: () => [randomInRange(1, 6), randomInRange(1, 6)]
  }
});

const value = createSlice({
  slice: "value",
  initialState: "",
  reducers: {
    setValue: (state, action) => action.payload.value
  },
  extraReducers: {
    [dicePair.actions.newQuestion.toString()]: () => ""
  }
});

const result = createSlice({
  slice: "result",
  initialState: 0,
  reducers: {},
  extraReducers: {
    [dicePair.actions.newQuestion.toString()]: () => randomInRange(12, 20)
  }
});

const score = createSlice({
  slice: "score",
  initialState: 0,
  reducers: {
    increaseScore: state => state + 1
  }
});

const gameOver = createSlice({
  slice: "gameOver",
  initialState: false,
  reducers: {
    setGameOver: () => true
  }
});

const timeLeft = createSlice({
  slice: "timeLeft",
  initialState: 100,
  reducers: {
    increaseTimer: (state, { payload }) => {
      const penalty = _.has(payload, "penalty") ? payload.penalty : null;
      let newValue = state + 1;
      if (penalty) {
        newValue = penalty + state > 100 ? 100 : penalty + state;
      }
      return newValue;
    },
    decreaseTimer: (state, { payload }) => {
      const penalty = _.has(payload, "penalty") ? payload.penalty : null;
      return penalty ? state - penalty : state - 1;
    }
  }
});

const { actions: timeLeftActions, reducer: timeLeftReducer } = timeLeft;
const { actions: valueActions, reducer: valueReducer } = value;
const { actions: dicePairActions, reducer: dicePairReducer } = dicePair;
const { actions: resultActions, reducer: resultReducer } = result;
const { actions: scoreActions, reducer: scoreReducer } = score;
const { actions: gameOverActions, reducer: gameOverReducer } = gameOver;

export const actions = {
  timeLeft: timeLeftActions,
  value: valueActions,
  dicePair: dicePairActions,
  result: resultActions,
  score: scoreActions,
  gameOver: gameOverActions
};

export default combineReducers({
  value: valueReducer,
  dicePair: dicePairReducer,
  result: resultReducer,
  score: scoreReducer,
  gameOver: gameOverReducer,
  timeLeft: timeLeftReducer
});
