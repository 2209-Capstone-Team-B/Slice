import React, { useState } from 'react';
import Link from 'next/link';

const AuthPage = () => {
  const [signIn, setSignIn] = useState(false);

  const handleClick = () => {
    setSignIn(!signIn);
  };

  return (
    <div className='flex items-center justify-center h-screen mb-0 bg-fixed bg-center bg-cover custom-img'>
      <div className='absolute top-0 right-0 bottom-0 left-0 bg-black/70 z-[2]' />
      <div className='p-5 text-white z-[2] object-top'>
        <Link href='/'>
          <h1 className='text-9xl antialiased font-serif-thin p-10 flex justify-center items-center hover:text-green-200'>
            Slice
          </h1>
        </Link>
        <div className='pb-5 flex space-x-10 justify-center items-center'>
          <Link href='/AuthPage'>
            <button
              className={`hover:text-slate-500 underline underline-offset-8 ${
                signIn ? 'decoration-yellow-400' : 'decoration-green-400'
              } text-2xl`}
              onClick={!signIn ? handleClick : null}
            >
              Sign In
            </button>
          </Link>
          <Link href='/AuthPage'>
            <button
              className={`hover:text-slate-500 underline underline-offset-8 ${
                signIn ? 'decoration-green-400' : 'decoration-yellow-400'
              } text-2xl`}
              onClick={signIn ? handleClick : null}
            >
              Sign Up
            </button>
          </Link>
        </div>
        {signIn ? (
          <div>
            <div className='flex justify-center items-center p-5'>
              <input
                type='text'
                placeholder='Username...'
                className='rounded-3xl p-3'
              />
            </div>
            <div className='flex justify-center items-center p-6'>
              <input
                type='password'
                placeholder='Password...'
                className='rounded-3xl p-3'
              />
            </div>
            <button className='flex justify-center items-center animate-bounce rounded-full p-3 bg-green-400 text-white text-sm m-auto hover:text-gray-600 hover:border'>
              Sign In
            </button>
          </div>
        ) : (
          <div>
            <div className='flex justify-center items-center p-5'>
              <input
                type='text'
                placeholder='Username...'
                className='rounded-3xl p-3'
              />
            </div>
            <div className='flex justify-center items-center p-5'>
              <input
                type='text'
                placeholder='Email...'
                className='rounded-3xl p-3'
              />
            </div>
            <div className='flex justify-center items-center p-6'>
              <input
                type='password'
                placeholder='Password...'
                className='rounded-3xl p-3'
              />
            </div>
            <button className='flex justify-center items-center animate-bounce rounded-full p-3 bg-green-400 text-white text-sm m-auto hover:text-gray-600 hover:border'>
              Sign Up
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
