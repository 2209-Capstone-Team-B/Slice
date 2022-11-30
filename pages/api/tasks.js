import { db } from '../../firebase.js';
import { collection, addDoc, getDocs } from 'firebase/firestore';

export default async (req, res) => {
  if (req.method === 'POST') {
    const docRef = await addDoc(collection(db, 'Tasks'), req.body);
    res.send(docRef);
  } else if (req.method === 'GET') {
    const docRef = await getDocs(collection(db, 'Tasks'));
    const tasks = [];
    docRef.forEach((doc) => {
      tasks.push(doc.id, ' => ', doc.data());
    });
    res.send(tasks);
  } else {
    // Handle any other HTTP method
    console.log('not a post request');
  }
};
