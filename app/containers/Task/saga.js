import { take, call, put, select } from 'redux-saga/effects';
import axios from 'axios';
import { fetchTasksAction } from './actions';

// Individual exports for testing
function getAllTasks() {
  const data = {};
  const axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      Accept: 'application/json',
    },
  };
  return axios
    .post('http://127.0.0.1:8000/api/all-tasks', data, axiosConfig)
    .then(response => {
      console.log(response.data);
      return response.data;
    });
}

export default function* taskSaga() {
  // See example in containers/HomePage/saga.js
  try {
    const data = yield call(getAllTasks);
    const tasks = data.tasks;
    yield put(fetchTasksAction(tasks));
  } catch (error) {
    console.log(error);
  }
}
