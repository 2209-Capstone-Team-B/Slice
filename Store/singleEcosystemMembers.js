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
const GET_ECOSYSTEM_MEMBERS = 'GET_ECOSYSTEM_MEMBERS';

// Action Creator
const _getECOSYSTEM_MEMBERS = (members) => {
  return {
    type: GET_ECOSYSTEM_MEMBERS,
    members,
  };
};

// Thunks
export const fetchEcosystemMembers = (ecoId) => (dispatch) => {
  const members = query(
    collection(db, 'EcosystemMembers'),
    where('ecosystemId', '==', ecoId)
  );
  const subscriber = onSnapshot(members, (querySnapshot) => {
    const ecoMembers = querySnapshot.docs.map((member) => ({
      ...member.data(),
      id: member.id,
    }));
    dispatch(_getECOSYSTEM_MEMBERS(ecoMembers));
  });
  return subscriber;
};

// Reducer
export default function ecosystemMembers(state = [], action) {
  switch (action.type) {
    case GET_ECOSYSTEM_MEMBERS: {
      return action.members;
    }
    default:
      return state;
  }
}
