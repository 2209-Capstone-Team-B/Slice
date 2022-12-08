import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { serverTimestamp, doc, setDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAuth } from '../context/AuthContext';
import Chart from './Chart';
import EditProfile from '../Components/EditProfile';
import EditPassword from '../Components/EditPassword';
import { getAuth, updatePassword } from 'firebase/auth';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const { currentUser } = useAuth();
  const [user] = useAuthState(auth);
  const router = useRouter();
  const data = router.query;
  const userObject = useSelector((state) => state.loggedInUser);

  const passUser = auth.currentUser;

  useEffect(() => {
    if (user && Object.keys(data).length !== 0) {
      const updateDb = async () => {
        await setDoc(
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
  }, [user]);

  return (
    <div className='mt-10'>
      {currentUser ? (
        <div className='flex justify-center'>
          <div className='flex w-1/2 justify-center text-3xl mt-2 mr-0 font-serif text-orange-400'>
            Account Information for {userObject.firstName}
          </div>
        </div>
      ) : null}
      <div className='bg-white h-screen flex justify-center items-stretch'>
        <div className='text-black justify-center flex items-center border border-gray-300 p-3 w-4/12 height shadow-[0_15px_70px_-15px_rgba(0,0,0,0.3)] rounded-3xl bg-slate-100 mt-6'>
          <div className='h-full flex flex-col w-11/12 justify-around'>
            <div className='user-details'>
              <h4 className='text-center rounded-2xl p-2 shadow-md border border-gray-200'>
                First Name: {userObject.firstName}
              </h4>
            </div>
            <div className='user-details'>
              <h4 className='text-center rounded-2xl p-2 shadow-md border border-gray-200'>
                Last Name: {userObject.lastName}
              </h4>
            </div>
            <div className='user-details'>
              <h4 className='text-center rounded-2xl p-2 shadow-md border border-gray-200'>
                Email: {userObject.email}
              </h4>
            </div>
            <div className='flex items-center justify-around h-1/4'>
              <EditProfile userObject={userObject} />
              <EditPassword passUser={passUser} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
