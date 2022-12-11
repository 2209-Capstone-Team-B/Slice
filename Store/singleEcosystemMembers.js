import axios from "axios";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  getDoc,
  getDocs,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  limit,
} from "firebase/firestore";
import { db } from "../firebase.js";

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
const GET_ECOSYSTEM_MEMBERS = "GET_ECOSYSTEM_MEMBERS";
const LOG_OUT = "LOG_OUT";

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
    collection(db, "EcosystemMembers"),
    where("ecosystemId", "==", ecoId)
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
  addDoc(collection(db, "EcosystemMembers"), {
    currencyAmount: 0,
    ecosystemId: ecoId,
    userId: userId,
    userName,
    color: randomRgbColor(),
  });
};

export const leaveMember = (userId, ecoId, type, admin) => async (dispatch) => {
  if (type === "Bulletin") {
    //delete all tasks where owner = user id, completed = false, ecosystemId = ecoid
    const incompleteTasks = query(
      collection(db, "Tasks"),
      where("owner", "==", userId),
      where("completed", "==", false),
      where("ecosystemId", "==", ecoId)
    );
    const incompleteTasksSnapshot = await getDocs(incompleteTasks);
    await Promise.all(incompleteTasksSnapshot.docs.map(task=>deleteDoc(task.ref)))

    //update all tasks where ecosystemId = ecoid assignedTo = user id to assignedTo = null
    const assignedTasks = query(
      collection(db, "Tasks"),
      where("completed", "==", false),
      where("ecosystemId", "==", ecoId),
      where("assignedTo", "==", userId)
    );
    const assignedTasksSnapshot = await getDocs(assignedTasks);
    assignedTasksSnapshot.forEach((task) => {
      updateDoc(task.ref, { assignedTo: null });
    });

    //delete EcosystemMember where userId= userId , ecosystemId = ecoid
    const ecoMember = query(
      collection(db, "EcosystemMembers"),
      where("ecosystemId", "==", ecoId),
      where("userId", "==", userId)
    );
    const ecoMemberSnapshot = await getDocs(ecoMember);
    await deleteDoc(ecoMemberSnapshot.docs[0].ref)

    //first check if there are any other ecomembers
    const otherEcoMember = query(
      collection(db, "EcosystemMembers"),
      where("ecosystemId", "==", ecoId),
      limit(1)
    );
    const otherEcoMemberSnap = await getDocs(otherEcoMember);
    if (otherEcoMemberSnap.size === 0) {
      //you're the last member, delete the whole eco
      deleteDoc(doc(db, "Ecosystem", ecoId));
    }
  }

  if (type === "Competition") {
    //delete EcosystemMember where userId= userId , ecosystemId = ecoid
    const ecoMember = query(
      collection(db, "EcosystemMembers"),
      where("ecosystemId", "==", ecoId),
      where("userId", "==", userId)
    );
    const ecoMemberSnapshot = await getDocs(ecoMember);
    await deleteDoc(ecoMemberSnapshot.docs[0].ref)

    if (admin) {
      //delete Admin status
      await deleteDoc(doc(db, "Ecosystem", ecoId, "Admin", userId));
      //assign next person Admin status
      //first check if there are any other ecomembers
      const otherEcoMember = query(
        collection(db, "EcosystemMembers"),
        where("ecosystemId", "==", ecoId),
        limit(1)
      );
      const otherEcoMemberSnap = await getDocs(otherEcoMember);
      if (otherEcoMemberSnap.size > 0) {
        //are there any other admins?
        const otherAdmins = query(collection(db, "Ecosystem", ecoId, "Admin"), limit(1))
        const otherAdminsSnap = await getDocs(otherAdmins)
        if (otherAdminsSnap.size===0){
          //give another user admin
          setDoc(
            doc(
              db,
              "Ecosystem",
              ecoId,
              "Admin",
              otherEcoMemberSnap.docs[0].data().userId
            ),
            { userId: otherEcoMemberSnap.docs[0].data().userId }
          )
        }
      } else {
        //you're the last member, delete the whole eco
        deleteDoc(doc(db, "Ecosystem", ecoId));
        //delete all the tasks too
        const ecoTasks = query(
          collection(db, "Tasks"),
          where("ecosystemId", "==", ecoId)
        );
        const ecoTasksSnapshot = await getDocs(ecoTasks);
        ecoTasksSnapshot.forEach((task) => {
          deleteDoc(task.ref);
        })
      }
    }

    //delete all rewardRequests
    const requests = query(
      collection(db, "RewardRequests"),
      where("ecosystemId", "==", ecoId),
      where("userId", "==", userId)
    );
    const requestsSnapshot = await getDocs(requests);
    requestsSnapshot.forEach((request) => {
      deleteDoc(request.ref);
    });
  }
  if (type === "QuickTask") {
    //delete every member of this ecosystem
    const ecoMember = query(
      collection(db, "EcosystemMembers"),
      where("ecosystemId", "==", ecoId)
    );
    const ecoMemberSnapshot = await getDocs(ecoMember);
    ecoMemberSnapshot.forEach((member) => {
      deleteDoc(member.ref);
    });
    //delete every task of this ecosystem
    const ecoTasks = query(
      collection(db, "Tasks"),
      where("ecosystemId", "==", ecoId)
    );
    const ecoTasksSnapshot = await getDocs(ecoTasks);
    ecoTasksSnapshot.forEach((task) => {
      deleteDoc(task.ref);
    });
    //delete the ecosystem
    deleteDoc(doc(db, "Ecosystem", ecoId));
  }
};

// Reducer
export default function ecosystemMembers(state = [], action) {
  switch (action.type) {
    case GET_ECOSYSTEM_MEMBERS: {
      return action.members;
    }
    case LOG_OUT: {
      return [];
    }
    default:
      return state;
  }
}
