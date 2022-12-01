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

// Action Creators
const _getECOSYSTEM = (ecosystem) => {
  return {
    type: GET_ECOSYSTEM,
    ecosystem,
  };
};

// Thunks
export const fetchEcosystem = (ecoId) => (dispatch) => {
 console.log(typeof ecoId)
  const subscriber = onSnapshot(doc(db, "Ecosystem", ecoId), (docSnapshot) => {

   dispatch(_getECOSYSTEM(docSnapshot.data()))
    /* const ecosystems = await Promise.all(
      querySnapshot.docs.map(async (ecoMember) => {
        const docRef = doc(db, 'Ecosystem', ecoMember.data().ecosystemId);
        const docSnap = await getDoc(docRef);
        return { ...docSnap.data(), id: docSnap.id };
      })
    ); */
  });
  return subscriber;
};

// Initial State
const initialState = {};

// Reducer
export default function userEcosystem(state = initialState, action) {
  switch (action.type) {
    case GET_ECOSYSTEM: {
      return action.ecosystem;
    }
    default:
      return state;
  }
}
