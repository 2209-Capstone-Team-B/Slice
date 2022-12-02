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

const GET_ECOSYSTEM_TASKS = 'GET_ECOSYSTEM_TASKS';

const _getECOSYSTEM_TASKS = (tasks) => {
  return {
    type: GET_ECOSYSTEM_TASKS,
    tasks,
  };
};

export const fetchEcosystemTasks = (ecoId) => (dispatch) => {
  const subscriber = onSnapshot(doc(db, 'Ecosystem', ecoId), (docSnapshot) => {
    dispatch(_getECOSYSTEM_TASKS(docSnapshot.data()));
  });
  return subscriber;
};

export default function userEcosystem(state = [], action) {
  switch (action.type) {
    case GET_ECOSYSTEM_TASKS: {
      return action.tasks;
    }
    default:
      return state;
  }
}
