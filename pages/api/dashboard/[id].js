import { db } from '../../../firebase.js';
import { collection, addDoc, query, getDocs, where } from 'firebase/firestore';
// import { useRouter } from 'next/router.js';

export default async (req, res) => {
  const { id } = req.query;

  if (req.method === 'POST') {
    const docRef = await addDoc(collection(db, 'Tasks'), req.body);
    res.send(docRef);
  } else if (req.method === 'GET') {
    const q = await query(collection(db, 'Tasks'), where('userId', '==', id));
    //q is the reference to those documents
    const docSnap = await getDocs(q);
    //fetching the docs at those addresses/references
    const mikeTasks = [];
    docSnap.forEach((doc) => {
      mikeTasks.push(doc.data());
      //.data() gets you you the info
    });
    res.send(mikeTasks);
  } else {
    // Handle any other HTTP method
    console.log('not a post request');
  }
};

//collections: # of docs, cant have anything on them except the documents
//documents: can have properties like userId, compeleted, name
    //can also contain collections which are sub collections