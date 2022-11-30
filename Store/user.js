import { collection, doc } from 'firebase/firestore';
import { db } from '../firebase.js';

// Actions
const GET_USER = 'GET_USER';

// Action Creators
const _getUser = (user) => {
  return {
    type: GET_USER,
    user,
  };
};

// Thunks
export const fetchUser = (userId) => {
  return async (dispatch) => {
    const userRef = doc(db, 'Users', userId);
    const userDoc = await getDoc(userRef);
    dispatch(_getUser(userDoc.data()));
  };
};

// Initial State
const initialState = {};

// Reducer
export default function loggedInUserReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER: {
      return action.user;
    }
    default:
      return state;
  }
}
