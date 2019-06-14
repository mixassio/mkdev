import { createSlice } from 'redux-starter-kit';
import { combineReducers } from "redux";

import _ from "lodash";

const randomInRange = (min: number, max: number): number =>
  Math.round(Math.random() * (max - min) + min);

export const dicePair: any = createSlice({
    slice: 'dicePair',
    initialState: [1, 1],
    reducers: {
        newQuestion: (state) => [randomInRange(1, 6), randomInRange(1, 6)],
    }
});

export const value: any = createSlice({
    slice: 'value',
    initialState: '',
    reducers: {
        setValue: (state, action) => action.payload.value,
    },
    extraReducers: {
        [dicePair.actions.newQuestion]: (state) => '',
    }
});

export const result: any = createSlice({
    slice: 'result',
    initialState: 0,
    extraReducers: {
        [dicePair.actions.newQuestion]: (state) => randomInRange(12, 20),
    }
});
    
export const score: any = createSlice({
    slice: 'score',
    initialState: 0,
    reducers: {
        increaseScore: (state) => state + 1,
    }
});

export const gameOver = createSlice({
    slice: 'gameOver',
    initialState: false,
    reducers: {
        setGameOver: (state) => true,
    }
});
      
export const timeLeft = createSlice({
    slice: 'timeLeft',
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
            const newValue = penalty ? state - penalty : state - 1;
            return newValue;
        },
    }
});

export default combineReducers({
    value,
    dicePair,
    result,
    score,
    gameOver,
    timeLeft
  });
