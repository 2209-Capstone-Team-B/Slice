import axios from 'axios';
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  getDoc,
  getDocs,
  deleteDoc,
  orderBy
} from 'firebase/firestore';
import { db } from '../firebase.js';

const GET_NOTIFICATIONS = 'GET_NOTIFICATIONS';

const _getNOTIFICATIONS = (notifications) => {
  return {
    type: GET_NOTIFICATIONS,
    notifications,
  };
};

export const fetchNotifications = (userId) => (dispatch) => {
  let today = new Date();
let priorDate = new Date(new Date().setDate(today.getDate() - 7))
  const notifications = query(collection(db, 'Notifications'), where('owner', '==', userId), where('completedAt', '>', priorDate), orderBy("completedAt", "desc"))
  const subscriber = onSnapshot(notifications, (querySnapshot)=>{
    const userNotifications = querySnapshot.docs.map(doc => ({...doc.data(), id: doc.id}))
    dispatch(_getNOTIFICATIONS(userNotifications))
  })
  return subscriber
}

/* export const deleteNotifications = (NotificationId) => (dispatch) => {
  deleteDoc(doc(db, "Notifications", NotificationId))
} */

export default function userNotifications(state = [], action) {
  switch (action.type) {
    case GET_NOTIFICATIONS: {
      return action.notifications;
    }
    default:
      return state;
  }
}
