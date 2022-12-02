import { db } from "../../firebase.js";
import { collection, addDoc, getDoc } from "firebase/firestore";

export default async (req, res) => {
  if (req.method === "GET") {
    const docRef = await getDoc(collection(db, "Ecosystem"));
    res.send(docRef);
  } else {
    // Handle any other HTTP method

    console.log("not a get request");
  }
};
