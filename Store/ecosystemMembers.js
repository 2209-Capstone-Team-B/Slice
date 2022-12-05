import axios from 'axios';
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  addDoc,
  getDoc,
} from 'firebase/firestore';
import { db } from '../firebase.js';

// Actions

const GET_MEMBERS = 'GET_MEMBERS';

// Action Creators

const _getMEMBERS = (members) => {
  return {
    type: GET_MEMBERS,
    members,
  };
};

// Thunks
export const setMember = (userId, ecoId, userName) => (dispatch) => {
  addDoc(collection(db, 'EcosystemMembers'), {
    currencyAmount: 0,
    ecosystemId: ecoId,
    userId: userId,
    userName,
  });
};

export const getMembers = (ecoId) => (dispatch) => {
  const members = query(
    collection(db, 'EcosystemMembers'),
    where('ecosystemId', '==', ecoId)
  );
  const subscriber = onSnapshot(members, (querySnapshot) => {
    const ecoMembers = querySnapshot.docs.map((member) => ({
      ...member.data(),
      id: member.id,
    }));
    dispatch(_getMEMBERS(ecoMembers));
  });
  return subscriber;
};

// Initial State
const initialState = [];

// Reducer
export default function ecosystemMembers(state = initialState, action) {
  switch (action.type) {
    case GET_MEMBERS: {
      return action.members;
    }
    default:
      return state;
  }
}
