/*
 *
 * Task actions
 *
 */

import { DEFAULT_ACTION, GET_ALL_TASKS,ADD_NEW_TASK, DELETE_TASK, UPDATE_STORE_AFTER_ADD_TASK } from './constants';

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
    type: ADD_NEW_TASK,
    data
  };
}

export function deleteTaskAction(data){
  console.log("Delete the task",data);
  return {
    type: DELETE_TASK,
    data
  }
}

export function updateStoreAfterAddTask(data){
  console.log(data,'Saga dev data');
  return {
    type: UPDATE_STORE_AFTER_ADD_TASK,
    data
  }
}

export function testAction(data){
  console.log('Tast action',)
}
