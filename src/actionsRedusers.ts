import {createSlice} from "redux-starter-kit";
import {combineReducers} from "redux";

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
    setGameOver: (state, payload) => true
  }
});

interface ScoreBoardRecord {
  achieved: Date;
  score: number;
}

interface PushToScoreBoardAction {
  type: string;
  payload: number;
}


const scoreBoard = createSlice({
  slice: "scoreBoard",
  initialState: [],
  reducers: {},
  extraReducers: {
    [gameOver.actions.setGameOver.toString()]: (state: ScoreBoardRecord[], { payload }: PushToScoreBoardAction) => {
      console.log(payload);
      const achieved = new Date();
      state.push({ achieved, score: payload });
    }
  },
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
      
      return penalty ? 
        (state - penalty) < 0 ? 0 : state - penalty
        : state - 1
    }
  }
});

export const actions = {
  dicePairActions: dicePair.actions,
  valueActions: value.actions,
  resultActions: result.actions,
  scoreActions: score.actions,
  scoreBoardActions: scoreBoard.actions,
  gameOverActions: gameOver.actions,
  timeLeftActions: timeLeft.actions
};

export default combineReducers({
  dicePair: dicePair.reducer,
  value: value.reducer,
  result: result.reducer,
  score: score.reducer,
  scoreBoard: scoreBoard.reducer,
  gameOver: gameOver.reducer,
  timeLeft: timeLeft.reducer
});
