import { takeLatest, call, put, select } from 'redux-saga/effects';
import axios from 'axios';
import { fetchTasksAction } from './actions';
import { ADD_NEW_TASK, DELETE_TASK } from './constants';

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


async function* addTaskRequest(task){
  let data = {
    name:task.data.name
  }
  const axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      Accept: 'application/json',
    },
  };

  let response =  await axios.post('http://127.0.0.1:8000/api/create-task', data, axiosConfig).then((response)=>{
                    console.log(response.data);
                    return response.data; 
                  });
  console.log(response);
  return response;                
}

export function* addTask(task){
  try{
    const newTask = yield call(addTaskRequest,task);
    
    const data = yield call(getAllTasks);
    const newwwwTask = data.newTask;
    yield put(fetchTasksAction(newwwwTask));
  }catch(error){
    console.log(error);
  }
}



async function deleteTaskRequest(task){
  console.log (task.data);
  let data = {
    id: task.data
  }
  const axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      Accept: 'application/json',
    },
  };

  let response = await axios.post('http://127.0.0.1:8000/api/delete-task', data , axiosConfig).then((response)=>{
                return response.data });
  return response;
}

export function* deleteTask(task){
  try{
    yield call(deleteTaskRequest , task);
    const data = yield call(getAllTasks);
    const tasks = data.tasks;
    yield put(fetchTasksAction(tasks));
  }catch(error){
    console.log(error);
  }
}

export default function* taskSaga() {
  // See example in containers/HomePage/saga.js
  try {
    const data = yield call(getAllTasks);
    const tasks = data.tasks;
    yield put(fetchTasksAction(tasks));
    yield takeLatest(ADD_NEW_TASK,addTask);
    yield takeLatest(DELETE_TASK,deleteTask);
  } catch (error) {
    console.log(error);
  }
}
