import { createAction } from "redux-actions";

export const setValue = createAction("SET_VALUE");

export const newQuestion = createAction("SET_NEW_QWESTION");

export const increaseScore = createAction("INCREASE_SCORE");

export const decreaseTimer = createAction("DECREASE_TIMER");
export const increaseTimer = createAction("INCREASE_TIMER");

export const setGameOver = createAction("SET_GAME_OVER");
