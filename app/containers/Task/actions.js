/*
 *
 * Task actions
 *
 */

import { DEFAULT_ACTION, GET_ALL_TASKS,ADD_NEW_TASK } from './constants';
// import { ADD_NEW_TASK } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function fetchTasksAction(data) {
  console.log(data);
  return {
    type: GET_ALL_TASKS,
    data,
  };
}


export function addNewTaskAction(data){
  console.log("Got new task",data);
  return {
    type:ADD_NEW_TASK,
    data
  };
}
