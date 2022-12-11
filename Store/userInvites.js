import axios from 'axios';
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  getDoc,
  getDocs,
  deleteDoc
} from 'firebase/firestore';
import { db } from '../firebase.js';

const GET_INVITES = 'GET_INVITES';
const LOG_OUT = "LOG_OUT"

const _getINVITES = (invites) => {
  return {
    type: GET_INVITES,
    invites,
  };
};

export const fetchInvites = (userId) => (dispatch) => {
  const invites = query(collection(db, 'Invites'), where('userId', '==', userId))
  const subscriber = onSnapshot(invites, (querySnapshot)=>{
    const userInvites = querySnapshot.docs.map(invite => ({...invite.data(), id: invite.id}))
    dispatch(_getINVITES(userInvites))
  })
  return subscriber
}

export const deleteInvite = (inviteId) => (dispatch) => {
  deleteDoc(doc(db, "Invites", inviteId))
}

export default function userInvites(state = [], action) {
  switch (action.type) {
    case GET_INVITES: {
      return action.invites;
    }
    case LOG_OUT: {
      return []
    }
    default:
      return state;
  }
}
