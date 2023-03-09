import axios from 'axios';
import { onSnapshot, collection, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase.js';

// Actions
const GET_USER = 'GET_USER';
const LOG_OUT = 'LOG_OUT';

// Action Creators
const _getUser = (user) => {
  return {
    type: GET_USER,
    user,
  };
};

const _logout = () => {
  return {
    type: LOG_OUT,
  };
};

// Thunks
export const fetchUser = (userId) => (dispatch) => {
  const userRef = doc(db, 'Users', userId);
  const subscriber = onSnapshot(userRef, (docSnapshot) => {
    dispatch(_getUser({ ...docSnapshot.data(), id: docSnapshot.id }));
  });
  return subscriber;
};

export const logoutClearRedux = () => {
  return (dispatch) => {
    dispatch(_logout());
  };
}

// Initial State
const initialState = {};

// Reducer
export default function loggedInUserReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER: {
      return action.user;
    }
    case LOG_OUT: {
      return {};
    }
    default:
      return state;
  }
}
