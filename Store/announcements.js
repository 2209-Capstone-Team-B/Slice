import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
  limit,
} from 'firebase/firestore';
import { db } from '../firebase.js';

const GET_ANNOUNCEMENTS = 'GET_ANNOUNCEMENTS';
const LOG_OUT = "LOG_OUT"

const _getANNOUNCEMENTS = (announcements) => {
  return {
    type: GET_ANNOUNCEMENTS,
    announcements,
  };
};

export const fetchAnnouncements = (ecoId) => (dispatch) => {
  const announcements = query(
    collection(db, 'Messages'),
    where('sentTo', '==', ecoId),
    orderBy('created', 'desc'),
    limit(50)
  );
  const subscriber = onSnapshot(announcements, (querySnapshot) => {
    const userAnnouncements = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    dispatch(_getANNOUNCEMENTS(userAnnouncements));
  });
  return subscriber;
};

export default function userAnnouncements(state = [], action) {
  switch (action.type) {
    case GET_ANNOUNCEMENTS: {
      return action.announcements;
    }
    case LOG_OUT: {
      return []
    }
    default:
      return state;
  }
}
