import { db } from '../../firebase.js';
import { collection, addDoc, query, getDocs } from 'firebase/firestore';

export default async (req, res) => {
  if (req.method === 'POST') {
    const docRef = await addDoc(collection(db, 'Users'), req.body);
    res.send(docRef);
  } else if (req.method === 'GET') {
    const docSnap = await getDocs(collection(db, 'Users'));
    const users = [];
    docSnap.forEach((doc) => {
      users.push(doc.data());
    });
    res.send(users);
  } else {
    // Handle any other HTTP method
    console.log('not a post request');
  }
};
