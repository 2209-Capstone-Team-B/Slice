import React, { useState } from "react";
import { auth, db } from "../firebase";
import { serverTimestamp, doc, setDoc, toDate } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Chart from "./Chart";
import Skeleton from "@mui/material/Skeleton";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, fetchTasks } from "../Store";
import MyCalendar from "./Calendar";
import DialogContentText from "@mui/material/DialogContentText";

export default function Dashboard() {
  //const [tasks, setTasks] = useState([]);
  const { currentUser } = useAuth();
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const data = router.query;
  const userObject = useSelector((state) => state.loggedInUser);
  const tasks = useSelector((state) => state.userTasks);
  const notifications = useSelector((state) => state.notifications);
  const dispatch = useDispatch();

  if (user) {
    useEffect(() => {
      const unsubscribe = dispatch(fetchTasks(user?.uid || userObject.id));
      return () => {
        unsubscribe();
      };
    }, []);
  }

  const completedTasks = tasks.filter((task) => task.completed === true);
  const incompleteTasks = tasks.filter((task) => task.completed === false);

  console.log(tasks);
  // if (!user) router.push("/");
  return (
    <div>
      {currentUser ? (
        <h2 className="text-center text-3xl pt-6 grid grid-auto-fit-sm font-serif text-blue-500">
          Welcome to your slice, {userObject.firstName}!
        </h2>
      ) : null}
      <div className="bg-white h-screen grid lg:grid-cols-2 pr-0 pl-28 pt-8">
        <div className="text-black lg:w-11/12 h-3/4 rounded-3xl flex flex-col shadow-[0_15px_70px_-15px_rgba(0,0,0,0.3)] overflow-auto">
          <div className="flex w-full h-96 justify-center items-center">
            {completedTasks.length || incompleteTasks.length ? (
              <Chart
                completed={completedTasks.length}
                incomplete={incompleteTasks.length}
              />
            ) : (
              <div className="animate-bounce border border-black rounded-full p-10">
                No Tasks For Me
              </div>
            )}
          </div>
          <div className="mt-auto">
            <div className="flex justify-center items-center text-center flex-col shadow-md border border-gray-200 rounded-2xl p-2 m-5 text-xs sm:text-base">
              <header className="text-center underline">Incomplete</header>
              {tasks.length ? (
                tasks.map(
                  (task) =>
                    !task.completed && (
                      <p
                        key={task.id}
                        className="text-black rounded-2xl border m-1 border-gray-200 bg-white w-4/6 shadow-sm"
                      >
                        {task.name}
                      </p>
                    )
                )
              ) : (
                <p className="text-gray-400 rounded-3xl bg-white w-2/6">
                  No Tasks For Me
                </p>
                //   )}
                // <div>
                //   <Skeleton variant='text' width={410} height={40} />
                //   <Skeleton variant='text' width={410} height={40} />
                //   <Skeleton variant='text' width={410} height={40} />
                // </div>
              )}
            </div>
            <div className="flex justify-center items-center text-center flex-col shadow-md border border-gray-200 rounded-3xl p-2 m-5 text-xs sm:text-base">
              <header className="text-center underline">Completed</header>
              {tasks.length ? (
                tasks.map(
                  (task) =>
                    task.completed && (
                      <p
                        key={task.id}
                        className="text-black rounded-3xl border border-slate-200 bg-white w-4/6"
                      >
                        {task.name}
                      </p>
                    )
                )
              ) : (
                <p className="text-gray-400 rounded-3xl bg-white w-2/6">
                  No Tasks For Me
                </p>
                // <div>
                //   <Skeleton variant='text' width={410} height={40} />
                //   <Skeleton variant='text' width={410} height={40} />
                //   <Skeleton variant='text' width={410} height={40} />
                // </div>
              )}
            </div>
          </div>
        </div>
        <div className="w-11/12 h-3/4 rounded-3xl relative">
          <div className="text-black p-3 mb-10 w-11/12 height rounded-3xl">
            <div className="flex justify-center items-center w-full h-full p-10">
              <MyCalendar />
            </div>
          </div>
          <div className="text-black border border-gray-200 p-3 w-11/12 height rounded-3xl absolute bottom-0 left-0 shadow-[0_15px_70px_-15px_rgba(0,0,0,0.3)] overflow-auto">
            <header className="text-center underline">
              Task Completion Notifications (last 7 days)
            </header>
            <ul className="list-decimal p-3">
              {notifications.length > 0 ? (
                notifications.map((note) => (
                  <li className="p-2" key={note.id}>
                    "{note.userName}" in "{note.orgName}" completed your task "
                    {note.name}" on {note.completedAt.toDate().toUTCString()}
                  </li>
                ))
              ) : (
                <DialogContentText className="text-center">
                  No Notifications
                </DialogContentText>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
