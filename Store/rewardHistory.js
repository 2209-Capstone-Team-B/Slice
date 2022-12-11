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

const GET_REWARD_HISTORY = 'GET_REWARD_HISTORY';

const _getREWARD_HISTORY = (history) => {
  return {
    type: GET_REWARD_HISTORY,
    history,
  };
};

export const fetchRewardHistory = (ecoId) => (dispatch) => {
  let today = new Date();
let priorDate = new Date(new Date().setDate(today.getDate() - 30))
  const approvedRewards = query(collection(db, 'RewardRequests'), where('ecosystemId', '==', ecoId),where('approved', '==', true), where('created', '>', priorDate), orderBy("created", "desc"))
  const subscriber = onSnapshot(approvedRewards, (querySnapshot)=>{
    const userHistory = querySnapshot.docs.map(doc => ({...doc.data(), rewardId: doc.id}))
    dispatch(_getREWARD_HISTORY(userHistory))
  })
  return subscriber
}

export default function userHistory(state = [], action) {
  switch (action.type) {
    case GET_REWARD_HISTORY: {
      return action.history;
    }
    default:
      return state;
  }
}
