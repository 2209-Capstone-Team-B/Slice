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
const GET_ECOSYSTEM = 'GET_ECOSYSTEM';
const LOG_OUT = "LOG_OUT"

// Action Creators
const _getECOSYSTEM = (ecosystem) => {
  return {
    type: GET_ECOSYSTEM,
    ecosystem,
  };
};

// Thunks
export const fetchEcosystem = (ecoId) => (dispatch) => {
  const subscriber = onSnapshot(doc(db, 'Ecosystem', ecoId), (docSnapshot) => {
    dispatch(_getECOSYSTEM({ ...docSnapshot.data(), id: docSnapshot.id }));
  });
  return subscriber;
};

// Reducer
export default function userEcosystem(state = {}, action) {
  switch (action.type) {
    case GET_ECOSYSTEM: {
      return action.ecosystem;
    }
    case LOG_OUT: {
      return {}
    }
    default:
      return state;
  }
}
