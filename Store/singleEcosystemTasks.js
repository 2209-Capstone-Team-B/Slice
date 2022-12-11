import axios from 'axios';
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  getDoc,
  getDocs,
} from 'firebase/firestore';
import { db } from '../firebase.js';

// Action Constant
const GET_ECOSYSTEM_TASKS = 'GET_ECOSYSTEM_TASKS';
const LOG_OUT = "LOG_OUT"

// Action Creator
const _getECOSYSTEM_TASKS = (tasks) => {
  return {
    type: GET_ECOSYSTEM_TASKS,
    tasks,
  };
};


/* export const fetchEcosystemTasks = (id) => async (dispatch) => {
  const q = await query(
    collection(db, 'Tasks'),
    where('ecosystemId', '==', id)
  );
  const docSnap = await getDocs(q);
  const tasks = [];
  docSnap.forEach((doc) => {
    tasks.push({...doc.data(), id: doc.id});
  });
  dispatch(_getECOSYSTEM_TASKS(tasks));
}; */

//Thunks
export const fetchEcosystemTasks = (ecoId) => (dispatch) => {
  const tasks = query(
    collection(db, 'Tasks'),
    where('ecosystemId', '==', ecoId)
  );
  const subscriber = onSnapshot(tasks, (querySnapshot) => {
    const ecoTasks = querySnapshot.docs.map((task) => ({
      ...task.data(),
      id: task.id,
    }));
    dispatch(_getECOSYSTEM_TASKS(ecoTasks));
  });
  return subscriber;
};


// Reducer
export default function userEcosystem(state = [], action) {
  switch (action.type) {
    case GET_ECOSYSTEM_TASKS: {
      return action.tasks;
    }
    case LOG_OUT: {
      return []
    }
    default:
      return state;
  }
}
