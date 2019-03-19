/*
 *
 * Task actions
 *
 */

import { DEFAULT_ACTION, GET_ALL_TASKS } from './constants';

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
