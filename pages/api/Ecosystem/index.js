import { db } from '../../../firebase.js';
import { collection, addDoc, query, getDoc, where } from 'firebase/firestore';

export default async (req, res) => {
  if (req.method === 'POST') {
    const { id, name, type, userName } = req.body;

    const docRef = await addDoc(collection(db, 'Ecosystem'), {
      orgName: name,
      type,
    });
    const docSnap = await getDoc(docRef);
    console.log(id);
    await addDoc(collection(db, 'EcosystemMembers'), {
      userId: id,
      userName,
      ecosystemId: docSnap.id,
    });
    res.send('Hello');
  } else {
    // Handle any other HTTP method
    console.log('not a post request');
  }
};
