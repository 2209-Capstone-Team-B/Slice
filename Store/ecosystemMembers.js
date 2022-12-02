import axios from "axios";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  addDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase.js";

// Actions

const GET_MEMBERS = "GET_MEMBERS";

// Action Creators

const _getMEMBERS = (members) => {
  return {
    type: GET_MEMBERS,
    members,
  };
};

// Thunks
export const setMember = (userId, ecoId, userName) => (dispatch) => {
  addDoc(collection(db, "EcosystemMembers"), {
    currencyAmount: 0,
    ecosystemId: ecoId,
    userId: userId,
    userName,
  });
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
