import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchEcosystem, fetchEcosystemTasks } from '../../Store';
import { useDispatch, useSelector } from 'react-redux';
import AddTask from '../../Components/AddTask';

export default function ecosystem() {
  const [addTask, setAddTasK] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const { singleEcosystem, singleEcosystemTasks } = useSelector(
    (state) => state
  );

  console.log('tasks', singleEcosystemTasks);

  useEffect(() => {
    const unsubscribeEcosystem = dispatch(fetchEcosystem(id));
    const unsubscribeEcosystemTasks = dispatch(fetchEcosystemTasks(id));
    return () => {
      unsubscribeEcosystem();
      unsubscribeEcosystemTasks();
    };
  }, []);

  return (
    <>
      <h3 className='text-center text-3xl pt-6'>{singleEcosystem.orgName}</h3>
      <div className='bg-white h-screen flex-col min-w-full pt-0 p-10'>
        <div className='flex h-1/2 w-full'>
          <div className='border border-black rounded-3xl flex justify-center w-full m-4'></div>
          <div className='flex border border-black rounded-3xl justify-center w-full m-4'>
            <AddTask id={id} />
          </div>
        </div>
        <div className='flex h-1/2 w-full'>
          <div className='border border-black rounded-3xl justify-center w-full m-4'></div>
        </div>
      </div>
    </>
  );
}
