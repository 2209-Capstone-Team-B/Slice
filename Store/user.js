import axios from "axios";
import { onSnapshot,collection, doc, getDoc} from "firebase/firestore"
import {db} from '../firebase.js'

// Actions
const GET_USER = "GET_USER";

// Action Creators
const _getUser = (user) => {
  return {
    type: GET_USER,
    user,
  };
};

// Thunks
export const fetchUser = (userId) => (dispatch)=> {
  const userRef = doc(db, "Users", userId)
  const subscriber = onSnapshot(userRef, (docSnapshot)=>{
    dispatch(_getUser({...docSnapshot.data(), id: docSnapshot.id}))
  })
 return subscriber
};

// Initial State
const initialState = {}

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
