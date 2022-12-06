import axios from 'axios';
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore';
import { db } from '../firebase.js';

//Helper Functions - random RGB color generator
function randomInteger(max) {
  return Math.floor(Math.random() * (max + 1));
}
function randomRgbColor() {
  let r = randomInteger(255);
  let g = randomInteger(255);
  let b = randomInteger(255);
  return `rgb(${r}, ${g}, ${b})`;
}

// Action Constant
const GET_ECOSYSTEM_MEMBERS = 'GET_ECOSYSTEM_MEMBERS';

// Action Creator
const _getECOSYSTEM_MEMBERS = (members) => {
  return {
    type: GET_ECOSYSTEM_MEMBERS,
    members,
  };
};

// Thunks
export const fetchEcosystemMembers = (ecoId) => (dispatch) => {
  const members = query(
    collection(db, 'EcosystemMembers'),
    where('ecosystemId', '==', ecoId)
  );
  const subscriber = onSnapshot(members, (querySnapshot) => {
    const ecoMembers = querySnapshot.docs.map((member) => ({
      ...member.data(),
      id: member.id,
    }));
    dispatch(_getECOSYSTEM_MEMBERS(ecoMembers));
  });
  return subscriber;
};

export const setMember = (userId, ecoId, userName) => (dispatch) => {
  addDoc(collection(db, 'EcosystemMembers'), {
    currencyAmount: 0,
    ecosystemId: ecoId,
    userId: userId,
    userName,
    color: randomRgbColor(),
  });
};

export const leaveMember = (userId, ecoId) => async (dispatch) => {
  //delete all tasks where owner = user id, completed = false, ecosystemId = ecoid
  const incompleteTasks = query(collection(db,"Tasks"), where("owner", "==", userId), where("completed", "==", false), where("ecosystemId", "==", ecoId))
  const incompleteTasksSnapshot = await getDocs(incompleteTasks)
  incompleteTasksSnapshot.forEach((task)=>{deleteDoc(task.ref)})
    //update all tasks where ecosystemId = ecoid assignedTo = user id to assignedTo = null
    const assignedTasks = query(collection(db,"Tasks"), where("completed", "==", false), where("ecosystemId", "==", ecoId), where("assignedTo", "==", userId))
    const assignedTasksSnapshot = await getDocs(assignedTasks)
    assignedTasksSnapshot.forEach((task)=>{updateDoc(task.ref, {assignedTo: null})})
    //delete EcosystemMember where userId= userId , ecosystemId = ecoid
    const ecoMember = query(collection(db,"EcosystemMembers"), where("ecosystemId", "==", ecoId), where("userId", "==", userId))
    const ecoMemberSnapshot = await getDocs(ecoMember)
    ecoMemberSnapshot.forEach((member)=>{deleteDoc(member.ref)})
}

// Reducer
export default function ecosystemMembers(state = [], action) {
  switch (action.type) {
    case GET_ECOSYSTEM_MEMBERS: {
      return action.members;
    }
    default:
      return state;
  }
}
