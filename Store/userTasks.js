import axios from 'axios';
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  getDoc,
} from 'firebase/firestore';
import { db } from '../firebase.js';

// Actions

const GET_TASKS = 'GET_TASKS';

// Action Creators
const _getTASKS = (tasks) => {
  return {
    type: GET_TASKS,
    tasks,
  };
};

// Thunks
export const fetchTasks = (userId) => (dispatch) => {
  const orgs = query(
    collection(db, 'Tasks'),
    where('assignedTo', '==', userId)
  );
  const subscriber = onSnapshot(orgs, (querySnapshot) => {
    const tasks = querySnapshot.docs.map((task) => ({
      ...task.data(),
      id: task.id,
    }));

    dispatch(_getTASKS(tasks));
  });
  return subscriber;
};

// Initial State
const initialState = [];

// Reducer
export default function userTasks(state = initialState, action) {
  switch (action.type) {
    case GET_TASKS: {
      return action.tasks;
    }
    default:
      return state;
  }
}
