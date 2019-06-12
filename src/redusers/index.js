import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const value = handleActions({
    [actions.setValue](state='', { payload: value }) {
        return value;
    }
}, '');



export default combineReducers({
    value,
  });