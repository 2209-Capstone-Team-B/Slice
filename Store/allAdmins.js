import { onSnapshot,collection, doc, getDoc, query} from "firebase/firestore"
import {db} from '../firebase.js'

// Actions
const GET_ADMINS = "GET_ADMINS";
const LOG_OUT = "LOG_OUT"

// Action Creators
const _getADMINS = (admins) => {
  return {
    type: GET_ADMINS,
    admins,
  };
};

// Thunks
export const fetchAdmins = (ecoId) => (dispatch)=> {
  const adminRef = query(collection(db,"Ecosystem",ecoId,"Admin"))
  const subscriber = onSnapshot(adminRef, (querySnapshot)=>{
    const allAdmins=querySnapshot.docs.map(admin=>admin.data())
    dispatch(_getADMINS(allAdmins))
  })
 return subscriber
};


// Initial State
const initialState = []

// Reducer
export default function allAdmins (state = initialState, action) {
  switch (action.type) {
    case GET_ADMINS: {
      return action.admins;
    }
    case LOG_OUT: {
      return []
    }
    default:
      return state;
  }
}
