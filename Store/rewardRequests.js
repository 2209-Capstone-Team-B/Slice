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
const GET_REQUESTS = 'GET_REQUESTS';

// Action Creator
const _getREQUESTS = (requests) => {
  return {
    type: GET_REQUESTS,
    requests,
  };
};

//Thunks
export const fetchRequests = (ecoId) => (dispatch) => {
  const requests = query(
    collection(db, 'RewardRequests'),
    where('ecosystemId', '==', ecoId), where('approved', '==', false)
  );
  const subscriber = onSnapshot(requests, (querySnapshot) => {
    const ecoRequests = querySnapshot.docs.map((request) => ({
      ...request.data(), requestId: request.id
    }));
    dispatch(_getREQUESTS (ecoRequests));
  });
  return subscriber;
};

// Reducer
export default function singleEcosystemRequests(state = [], action) {
  switch (action.type) {
    case GET_REQUESTS: {
      return action.requests;
    }
    default:
      return state;
  }
}
