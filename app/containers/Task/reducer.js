/*
 *
 * Task reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, GET_ALL_TASKS , DELETE_TASK, UPDATE_STORE_AFTER_ADD_TASK } from './constants';


export const initialState = fromJS({
  tasks: []
});

function taskReducer(state = initialState, action) {
  switch (action.type) {
    
    case DEFAULT_ACTION:{
      return state;
    }
      
    case GET_ALL_TASKS:{
      return state.set('tasks', action.data);
    }
    
    case UPDATE_STORE_AFTER_ADD_TASK:{
      
      const tasks = fromJS( state.get('tasks'));
      let new_task = {
        id: action.data.task.id,
        name:action.data.task.name
      }
      
      return state.set('tasks',tasks.insert(0,new_task));
    }
      
    case DELETE_TASK:{
      const tasks = fromJS(state.get('tasks'));
      for (const key in tasks.toJS()) {
        if (tasks.toJS()[key].id == action.data) {
          return state.set('tasks', tasks.deleteIn([key]));
        }
      }
      return state;
      
    }
      
    default:
      return state;
  }
}

export default taskReducer;
