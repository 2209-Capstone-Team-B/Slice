import { onSnapshot,collection, doc, getDoc} from "firebase/firestore"
import {db} from '../firebase.js'

// Actions
const GET_ADMIN = "GET_ADMIN";

// Action Creators
const _getADMIN = (admin) => {
  return {
    type: GET_ADMIN,
    admin,
  };
};

// Thunks
export const fetchAdmin = (ecoId, userId) => (dispatch)=> {
  const adminRef = doc(db, "Ecosystem", ecoId, "Admin", userId )
  const subscriber = onSnapshot(adminRef, (docSnapshot)=>{
    dispatch(_getADMIN(docSnapshot.exists()))
  })
 return subscriber
};

export const testAdmin = (ecoId, userId) => async(dispatch)=> {
  const adminDoc = await getDoc(doc(db, "Ecosystem", ecoId, "Admin", userId ))
dispatch(_getADMIN(adminDoc.exists()))
};


// Initial State
const initialState = false

// Reducer
export default function isAdmin (state = initialState, action) {
  switch (action.type) {
    case GET_ADMIN: {
      return action.admin;
    }
    default:
      return state;
  }
}
