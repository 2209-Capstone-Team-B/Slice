import axios from 'axios';
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  getDoc,
  getDocs,
  deleteDoc,
  orderBy
} from 'firebase/firestore';
import { db } from '../firebase.js';

const GET_HISTORY = 'GET_HISTORY';

const _getHISTORY = (history) => {
  return {
    type: GET_HISTORY,
    history,
  };
};

export const fetchTaskHistory = (ecoId) => (dispatch) => {
  let today = new Date();
let priorDate = new Date(new Date().setDate(today.getDate() - 30))
  const completedTasks = query(collection(db, 'Tasks'), where('ecosystemId', '==', ecoId),where('completed', '==', true), where('completedAt', '>', priorDate), orderBy("completedAt", "desc"))
  const subscriber = onSnapshot(completedTasks, (querySnapshot)=>{
    const userHistory = querySnapshot.docs.map(doc => ({...doc.data(), id: doc.id}))
    dispatch(_getHISTORY(userHistory))
  })
  return subscriber
}

export default function userHistory(state = [], action) {
  switch (action.type) {
    case GET_HISTORY: {
      return action.history;
    }
    default:
      return state;
  }
}
