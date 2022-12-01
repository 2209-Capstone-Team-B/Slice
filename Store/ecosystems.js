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
const GET_ECOSYSTEMS = 'GET_ECOSYSTEMS';

// Action Creators
const _getECOSYSTEMS = (ecosystems) => {
  return {
    type: GET_ECOSYSTEMS,
    ecosystems,
  };
};

// Thunks
export const fetchEcosystems = (userId) => (dispatch) => {
  const orgs = query(
    collection(db, 'EcosystemMembers'),
    where('userId', '==', userId)
  );
  const subscriber = onSnapshot(orgs, async (querySnapshot) => {
    const ecosystems = await Promise.all(
      querySnapshot.docs.map(async (ecoMember) => {
        const docRef = doc(db, 'Ecosystem', ecoMember.data().ecosystemId);
        const docSnap = await getDoc(docRef);
        return { ...docSnap.data(), id: docSnap.id };
      })
    );
    dispatch(_getECOSYSTEMS(ecosystems));
  });
  return subscriber;
};

// Initial State
const initialState = [];

// Reducer
export default function userEcosystems(state = initialState, action) {
  switch (action.type) {
    case GET_ECOSYSTEMS: {
      return action.ecosystems;
    }
    default:
      return state;
  }
}
