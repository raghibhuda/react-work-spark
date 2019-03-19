/*
 *
 * Task reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, GET_ALL_TASKS } from './constants';

export const initialState = fromJS({
  tasks: [],
});

function taskReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case GET_ALL_TASKS:
      return state.set('tasks', action.data);
    default:
      return state;
  }
}

export default taskReducer;
