import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const randomInRange = (min, max) =>
  Math.round(Math.random() * (max - min) + min);


const value = handleActions({
    [actions.setValue](state='', { payload: { value } }) {
        return value;
    }
}, '');

const dicePair = handleActions({
    [actions.newQwestion](state=[1, 1]) {
        return [randomInRange(1, 6), randomInRange(1, 6)];
    }
}, []);

const result = handleActions({
    [actions.newQwestion](state=0) {
        return randomInRange(12, 20);
    }
}, 0);

const score = handleActions({
    [actions.increaseScore](state=0) {
        return state + 1;
    }
}, 0);

const gameOver = handleActions({
    [actions.setGameOver](state=false) {
        return true;
    }
}, false);

export default combineReducers({
    value,
    dicePair,
    result,
    score,
    gameOver,
  });