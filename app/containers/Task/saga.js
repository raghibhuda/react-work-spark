import { takeLatest, call, put, select } from 'redux-saga/effects';
import axios from 'axios';
import { fetchTasksAction ,updateStoreAfterAddTask, updateStoreEditTask} from './actions';
import { ADD_NEW_TASK, DELETE_TASK, EDIT_TASK  } from './constants';

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
      return response.data;
    }).catch((error) => {
      console.log(error);
    });
}


async function addTaskRequest(task){
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
                    return response.data; 
                  }).catch((error) => {
                    console.log(error);
                  });
  return response;                
}


export function* addTask(task){
  try{
    let newTask = yield call(addTaskRequest,task); 
    yield put(updateStoreAfterAddTask(newTask));
  }catch(error){
    console.log(error);
  }
}



async function deleteTaskRequest(task){
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

  let response = await axios.post('http://127.0.0.1:8000/api/delete-task', data , axiosConfig)
                .then((response)=>{
                    return response.data })
                .catch((error) => {
                    console.log(error);
                });
  return response;
}

export function* deleteTask(task){
  try{
    yield call(deleteTaskRequest , task);
  }catch(error){
    console.log(error);
  }
}

async function editTaskRequest (task){
  console.log(task, 'Got data ');
  let data = {
    id: task.data.id,  
    name: task.data.name,  
  }
  const axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      Accept: 'application/json',
    },
  };
  let response = await axios.post('http://127.0.0.1:8000/api/edit-task', data , axiosConfig)
                .then((response)=>{
                    return response.data })
                .catch((error) => {
                    console.log(error);
                });
  return response;
}



export function* editTask(data){
  try{
    let editedTask = yield call(editTaskRequest,data);
    yield put(updateStoreEditTask(editedTask));
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
    yield takeLatest(EDIT_TASK,editTask);
  
  } catch (error) {
    console.log(error);
  }
}
