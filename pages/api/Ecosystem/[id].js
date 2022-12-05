import { db } from '../../../firebase.js';
import { collection, addDoc, query, getDocs, where } from 'firebase/firestore';
// import { useRouter } from 'next/router.js';

export default async (req, res) => {
  const { id } = req.query;
  if (req.method === 'POST') {
    const docRef = await addDoc(collection(db, 'Tasks'), req.body);
    res.send(docRef);
  } else if (req.method === 'GET') {
    const q = await query(
      collection(db, 'Tasks'),
      where('ecosystemId', '==', id)
    );
    const docSnap = await getDocs(q);
    const tasks = [];
    docSnap.forEach((doc) => {
      tasks.push(doc.data());
    });
    res.send(tasks);
  } else {
    // Handle any other HTTP method
    console.log('not a post request');
  }
};
