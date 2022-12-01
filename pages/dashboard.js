import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { serverTimestamp, doc, setDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Chart from './Chart';
import {useDispatch, useSelector} from "react-redux"
import {fetchUser, fetchTasks} from '../Store'

export default function Dashboard() {
  //const [tasks, setTasks] = useState([]);
  const { currentUser } = useAuth();
  const [user,loading] = useAuthState(auth);
  const router = useRouter();
  const data = router.query;
  const userObject = useSelector((state)=>state.loggedInUser)
  const tasks = useSelector((state)=>state.userTasks)
  const dispatch = useDispatch()

  useEffect(() => {
    if (user) {
        const getUser = async() =>{
          try {
            dispatch( fetchUser(user.uid))
          } catch (error) {
           console.log(error)
          }
        }
      getUser()
    }
  }, [user]);
  useEffect(() => {
    const unsubscribe = dispatch(fetchTasks(user.uid));
    return () => {
      unsubscribe();
    };
  }, []);

  const completedTasks = tasks.filter((task) => task.completed === true);
  const incompleteTasks = tasks.filter((task) => task.completed === false);

  return (
    <div>
      {currentUser ? (
        <div className='text-center text-3xl pt-6'>
          Hello {userObject.firstName}
        </div>
      ) : null}
      <div className='bg-white h-screen flex justify-start items-stretch'>
        <div className='text-black p-3 w-5/12 h-3/4 m-auto rounded-3xl flex flex-col overflow-auto'>
          <div className='flex w-full h-96 justify-center items-center'>
            {completedTasks.length || incompleteTasks.length ? (
              <Chart
                completed={completedTasks.length}
                incomplete={incompleteTasks.length}
              />
            ) : (
              <h1 className='border border-solid border-amber-400 p-16 rounded-full animate-bounce'>
                No Tasks For Me
              </h1>
            )}
          </div>
          <div className='mt-auto'>
            <div className='flex justify-center items-center text-center flex-col bg-amber-100 duration-300 hover:scale-110 rounded-3xl p-2 m-5'>
              <header className='text-center underline text-2xl'>
                Incomplete
              </header>
              {tasks.map(
                (task) =>
                  !task.completed && (
                    <p
                      key={task.name}
                      className='text-black rounded-3xl border border-slate-200 bg-white w-2/6'
                    >
                      {task.name}
                    </p>
                  )
              )}
            </div>
            <div className='flex justify-center items-center text-center flex-col bg-amber-100 duration-300 hover:scale-110 rounded-3xl p-2 m-5 overflow-auto'>
              <header className='text-center underline text-2xl'>
                Completed
              </header>
              {tasks.map(
                (task) =>
                  task.completed && (
                    <p
                      key={task.name}
                      className='text-black rounded-3xl border border-slate-200 bg-white w-2/6'
                    >
                      {task.name}
                    </p>
                  )
              )}
            </div>
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
