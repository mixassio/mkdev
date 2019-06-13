import { combineReducers } from "redux";
import { handleActions } from "redux-actions";
import _ from "lodash";
import * as actions from "../actions";

const randomInRange = (min, max) =>
  Math.round(Math.random() * (max - min) + min);

const value = handleActions(
  {
    [actions.setValue](
      state = "",
      {
        payload: { value }
      }
    ) {
      return value;
    },
    [actions.newQuestion](state = "") {
      return "";
    }
  },
  ""
);

const dicePair = handleActions(
  {
    [actions.newQuestion](state = [1, 1]) {
      return [randomInRange(1, 6), randomInRange(1, 6)];
    }
  },
  []
);

const result = handleActions(
  {
    [actions.newQuestion](state = 0) {
      return randomInRange(12, 20);
    }
  },
  0
);

const score = handleActions(
  {
    [actions.increaseScore](state = 0) {
      return state + 1;
    }
  },
  0
);

const gameOver = handleActions(
  {
    [actions.setGameOver](state = false) {
      return true;
    }
  },
  false
);

const timeLeft = handleActions(
  {
    [actions.increaseTimer](state = 100, { payload }) {
      const penalty = _.has(payload, "penalty") ? payload.penalty : null;
      console.log(penalty);
      let newValue = state + 1;
      if (penalty) {
        newValue = penalty + state > 100 ? 100 : penalty + state;
      }
      return newValue;
    },
    [actions.decreaseTimer](state = 100, { payload }) {
      const penalty = _.has(payload, "penalty") ? payload.penalty : null;
      const newValue = penalty ? state - penalty : state - 1;
      return newValue;
    }
  },
  100
);

export default combineReducers({
  value,
  dicePair,
  result,
  score,
  gameOver,
  timeLeft
});
