import { db } from '../../firebase.js';
import { collection, addDoc, query, getDocs, where } from 'firebase/firestore';

export default async (req, res) => {
  if (req.method === 'POST') {
    const docRef = await addDoc(collection(db, 'Tasks'), req.body);
    res.send(docRef);
  } else if (req.method === 'GET') {
    // const docSnap = await getDocs(collection(db, 'Tasks'));
    // const tasks = [];
    // docSnap.forEach((doc) => {
    //   tasks.push(doc.data());
    // });
    // res.send(tasks);
    const userId = '6Q3CNj1zPohO5hm3pK4B74Z9t5E2';
    const q = await query(
      collection(db, 'Tasks'),
      where('userId', '==', userId)
    );
    const docSnap = await getDocs(q);
    const mikeTasks = [];
    docSnap.forEach((doc) => {
      mikeTasks.push(doc.data());
    });
    res.send(mikeTasks);
  } else {
    // Handle any other HTTP method
    console.log('not a post request');
  }
};
