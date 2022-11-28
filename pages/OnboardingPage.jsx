import React from 'react';
// import Link from 'next/link';
import { useRouter } from 'next/router';

const OnboardingPage = () => {
  const router = useRouter();

  const redirect = () => {
    router.push('/AuthPage');
  };

  return (
    <div className='flex items-center justify-center h-screen mb-0 bg-fixed bg-center bg-cover custom-img'>
      <div className='absolute top-0 right-0 bottom-0 left-0 bg-black/70 z-[2]' />
      <div className='p-5 text-white z-[2]'>
        <h1 className='text-9xl antialiased font-serif-thin hover:italic p-1 flex justify-center items-center'>
          Slice
        </h1>
        <h1 className='flex justify-center items-center mb-9'>Task Management</h1>
        {/* <Link href='/AuthPage'> */}
        <button
          className='flex animate-bounce rounded-full p-3 bg-green-400 text-white text-sm m-auto hover:text-gray-600 hover:border'
          onClick={redirect}
        >
          Get Started
        </button>
        {/* </Link> */}
      </div>
    </div>
  );
};

export default OnboardingPage;
