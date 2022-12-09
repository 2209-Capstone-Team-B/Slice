import { db } from '../../../firebase.js';
import { collection, addDoc, query, getDoc, where, setDoc, doc } from 'firebase/firestore';

function randomInteger(max) {
  return Math.floor(Math.random() * (max + 1));
}

function randomRgbColor() {
  let r = randomInteger(255);
  let g = randomInteger(255);
  let b = randomInteger(255);
  return `rgb(${r}, ${g}, ${b})`;
}

export default async (req, res) => {
  if (req.method === 'POST') {
    const { id, name, type, userName, description } = req.body;

    const docRef = await addDoc(collection(db, 'Ecosystem'), {
      orgName: name,
      type,
      description
    });
    const docSnap = await getDoc(docRef);
    console.log(id);
    await addDoc(collection(db, 'EcosystemMembers'), {
      userId: id,
      userName,
      ecosystemId: docSnap.id,
      currencyAmount: 0,
      color: randomRgbColor(),
    });
    if (type === "Competition"){
      await setDoc(doc(db, "Ecosystem", docSnap.id, "Admin", id), {userId: id})
    }
    res.send('Hello');
  } else {
    // Handle any other HTTP method
    console.log('not a post request');
  }
};
