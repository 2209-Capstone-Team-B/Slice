import {db} from '../../firebase.js'
import { collection, addDoc } from "firebase/firestore";

export default async (req, res)=> {
  if (req.method === 'POST') {
   const docRef = await addDoc(collection(db, "Users"), req.body)
   res.send(docRef)
  } else {
    // Handle any other HTTP method
    console.log('not a post request')
  }
}

