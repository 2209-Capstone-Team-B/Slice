import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { serverTimestamp, doc, setDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const { currentUser } = useAuth();
  const [user] = useAuthState(auth);
  const router = useRouter();
  const data = router.query;

  useEffect(() => {
    if (user && Object.keys(data).length !== 0) {
      const updateDb = async () => {
        const data2 = await setDoc(
          doc(db, 'Users', user.uid),
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
    if (user) {
      const fetchTasks = async () => {
        const res = await fetch(`/api/dashboard/${currentUser.uid}`);
        const data = await res.json();
        setTasks(data);
      };
      fetchTasks();
    }
  }, [user]);

  return (
    <div>
      {currentUser ? (
        <div className='text-center text-3xl pt-6'>
          Hello {currentUser.email}
        </div>
      ) : null}
      <div className='bg-white h-screen flex justify-center items-stretch'>
        <div className='text-black border border-black hover:border-amber-400 p-3 w-5/12 h-3/4 m-auto rounded-3xl'>
          {/* {tasks.map((task) => {
            return (
              <p key={task.name} className='text-black'>
                {task.name}
              </p>
            );
          })} */}
          <div className=''>
            <div className='border border-black rounded-3xl'>In Progress</div>
            <div className='border border-black rounded-3xl'>Incomplete</div>
            <div className='border border-black rounded-3xl'>Complete</div>
          </div>
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
    </div>
  );
}
