import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../firebase';
import { useRouter } from 'next/router';
import {
  fetchEcosystem,
  fetchEcosystemTasks,
  fetchEcosystemMembers,
} from '../../Store';
import { useDispatch, useSelector } from 'react-redux';
import AddTask from '../../Components/AddTask';
import EditTask from '../../Components/EditTask';
import InvitePeople from '../../Components/InvitePeople';
import ClaimTask from '../../Components/ClaimTask';

export default function ecosystem() {
  const [addTask, setAddTasK] = useState(false);
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const { singleEcosystem, singleEcosystemTasks, ecosystemMembers } =
    useSelector((state) => state);

  const getTasks = async (id) => await dispatch(fetchEcosystemTasks(id));

  useEffect(() => {
    const unsubscribeEcosystemMembers = dispatch(fetchEcosystemMembers(id));
    const unsubscribeEcosystem = dispatch(fetchEcosystem(id));
    const unsubscribeEcosystemTasks = dispatch(fetchEcosystemTasks(id));
    return () => {
      unsubscribeEcosystemMembers();
      unsubscribeEcosystemTasks();
      unsubscribeEcosystem();
    };
  }, [id]);

  return (
    <>
      <h3 className='text-center text-3xl pt-6'>{singleEcosystem.orgName}</h3>
      <div className='bg-white h-screen flex-col min-w-full pt-0 p-10'>
        <div className='flex h-1/2 w-full'>
          <div className='border border-black rounded-3xl grid grid-rows-[1rem, 3rem] w-full m-4'>
            <InvitePeople />
            <div className='flex flex-wrap justify-center'>
              {ecosystemMembers.map((member, i) => (
                <div
                  key={i}
                  className='border border-black text-center w-3/4 rounded-2xl p-2 m-2'
                >
                  {member.userId}
                </div>
              ))}
            </div>
          </div>
          <div className='border border-black rounded-3xl justify-center w-full m-4 overflow-auto'>
            <AddTask id={id} getTasks={getTasks} />
            <div className='flex flex-wrap justify-center'>
              {singleEcosystemTasks.map((task, i) => (
                <div
                  key={i}
                  className='border border-black text-center w-3/4 rounded-2xl p-2 m-2'
                >
                  {task.name} due {task.due}
                  <div className='flex justify-around p-3'>
                    {task.owner === user.uid && <EditTask task={task} />}
                    <ClaimTask task={task} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='flex h-1/2 w-full'>
          <div className='flex border border-black rounded-3xl justify-center w-full m-4'>
            <Chart className='w-full' />
          </div>
        </div>
      </div>
    </>
  );
}

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  registerables,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(...registerables, Tooltip, Legend);

const Chart = () => {
  const data = {
    labels: ['Scott', 'Mike', 'Cadre', 'Tasdid', 'Allan', 'Sarah', 'Emily'],
    datasets: [
      {
        barPercentage: 0.5,
        barThickness: 50,
        maxBarThickness: 800,
        minBarLength: 2,
        data: [1, 6, 7, 4, 5, 2, 3],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(170, 239, 139)',
          'rgb(137, 167, 178)',
          'rgb(107, 32, 173)',
          'rgb(244, 175, 24)',
          'rgb(204, 38, 26)',
        ],
        hoverOffset: 4,
      },
    ],
  };

  return <Bar data={data} />;
};
