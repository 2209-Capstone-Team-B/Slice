import React from 'react';
import { auth, db } from "../firebase";
import { serverTimestamp, doc, setDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Dashboard() {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const data = router.query;

  useEffect(() => {
    if (user && data.firstName.length !== 0) {
      const updateDb = async () => {
        const data2 = await setDoc(
          doc(db, "Users", user.uid),
          {
            email: user.email,
            firstName: data.firstName,
            lastName: data.lastName,
            created: serverTimestamp(),
          },
          { merge: true }
        );
      };

      updateDb().catch(console.error);
    }
  }, [user]);

  return (
    <div className='bg-white h-screen flex justify-center items-stretch'>
      {/* <div className='w-screen flex justify-center items-center pb-0'> */}
      <div className='text-black border border-black p-3 w-5/12 h-3/4 m-auto rounded-3xl'>
        Div1
      </div>
      <div className='w-5/12 h-3/4 m-auto rounded-3xl relative'>
        <div className='text-black border border-black p-3 mb-10 w-11/12 height rounded-3xl'>
          Div 2
        </div>
        <div className='text-black border border-black p-3 w-11/12 height rounded-3xl absolute bottom-0 left-0'>
          Div 3
        </div>
      </div>
    </div>
  );
};

export default dashboard;
