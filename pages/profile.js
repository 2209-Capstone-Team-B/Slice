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
    <div>
      {currentUser ? (
        <div className='text-center text-3xl pt-6'>
          Account Information for {userObject.firstName}
        </div>
      ) : null}
      <div className='bg-white h-screen flex justify-start items-stretch'>
        <div className='text-black p-3 w-5/12 h-3/4 m-auto rounded-3xl flex flex-col overflow-auto'>
          <div className='text-black border border-black p-3 w-4/12 height rounded-3xl absolute bg-slate-100'>
            <div className='flex w-full h-96 flex-col space-y-7 items-center absolute'>
              <div className='user-details'>
                <h4>First Name: </h4>
                <p className='text-black'>{userObject.firstName}</p>
              </div>
              <div className='user-details'>
                <h4>Last Name: </h4>
                <p className='text-black'>{userObject.lastName}</p>
              </div>
              <div className='user-details'>
                <h4>Email: </h4>
                <p className='text-black'>{userObject.email}</p>
              </div>
              <EditProfile userObject={userObject} />
              <EditPassword passUser={passUser} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
