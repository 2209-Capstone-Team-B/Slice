import axios from "axios";
import {
  setDoc,
  addDoc,
  collection,
  query,
  where,
  onSnapshot,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase.js";

function randomInteger(max) {
  return Math.floor(Math.random() * (max + 1));
}

function randomRgbColor() {
  let r = randomInteger(255);
  let g = randomInteger(255);
  let b = randomInteger(255);
  return `rgb(${r}, ${g}, ${b})`;
}

// Actions

const GET_ECOSYSTEMS = "GET_ECOSYSTEMS";
const UPDATE_ECOSYSTEM = "UPDATE_ECOSYSTEM";
const LOG_OUT = "LOG_OUT";

// Action Creators
const _getECOSYSTEMS = (ecosystems) => {
  return {
    type: GET_ECOSYSTEMS,
    ecosystems,
  };
};

export const _updateEcosystem = (ecosystem) => {
  return {
    type: UPDATE_ECOSYSTEM,
    ecosystem,
  };
};

// Thunks
export const fetchEcosystems = (userId) => (dispatch) => {
  const orgs = query(
    collection(db, "EcosystemMembers"),
    where("userId", "==", userId)
  );
  const subscriber = onSnapshot(orgs, async (querySnapshot) => {
    const ecosystems = await Promise.all(
      querySnapshot.docs.map(async (ecoMember) => {
        const docRef = doc(db, "Ecosystem", ecoMember.data().ecosystemId);
        const docSnap = await getDoc(docRef);
        return { ...docSnap.data(), id: docSnap.id };
      })
    );
    dispatch(_getECOSYSTEMS(ecosystems));
  });
  return subscriber;
};

export const addEcosystem = (eco) => async (dispatch) => {
  const { id, name, type, userName, description } = eco;
  const docRef = await addDoc(collection(db, "Ecosystem"), {
    orgName: name,
    type,
    description,
  });
  const docSnap = await getDoc(docRef);
  addDoc(collection(db, "EcosystemMembers"), {
    userId: id,
    userName,
    ecosystemId: docSnap.id,
    currencyAmount: 0,
    color: randomRgbColor(),
  });
  if (type === "Competition") {
    setDoc(doc(db, "Ecosystem", docSnap.id, "Admin", id), { userId: id });
  }
};

export const createEcosystemMember = (ecoId, userName) => async (dispatch) => {
  /*   const { id, name, type, userName, description } = eco
  const docRef = await addDoc(collection(db, 'Ecosystem'), {
    orgName: name,
    type,
    description
  });
  const docSnap = await getDoc(docRef); */

  const docRef = await addDoc(collection(db, "EcosystemMembers"), {
    userId: null,
    userName,
    ecosystemId: ecoId,
    currencyAmount: 0,
    color: randomRgbColor(),
  });

  const memberDoc = await getDoc(docRef);

  updateDoc(docRef, { userId: docRef.id });
};

// Initial State
const initialState = [];

// Reducer
export default function userEcosystems(state = initialState, action) {
  switch (action.type) {
    case GET_ECOSYSTEMS: {
      return action.ecosystems;
    }
    case UPDATE_ECOSYSTEM: {
      return state.map((eco) => {
        if (eco.id === action.ecosystem.id) {
          return { ...eco, ...action.ecosystem };
        } else {
          return eco;
        }
      });
    }
    case LOG_OUT: {
      return [];
    }
    default:
      return state;
  }
}
