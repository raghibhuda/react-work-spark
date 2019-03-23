/*
 *
 * Task reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, GET_ALL_TASKS ,ADD_NEW_TASK, DELETE_TASK } from './constants';


export const initialState = fromJS({
  tasks: [],
  id : null,
});

function taskReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case GET_ALL_TASKS:
      return state.set('tasks', action.data);
    case ADD_NEW_TASK:
      return state;
    case DELETE_TASK:
      return state;
    default:
      return state;
  }
}

export default taskReducer;
