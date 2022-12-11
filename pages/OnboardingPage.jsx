import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
import { useRouter } from 'next/router';

const OnboardingPage = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = ['custom-img', 'custom-img2', 'custom-img3'];

  const autoScroll = true;
  let slideInterval;

  const autoSlide = () => {
    slideInterval = setInterval(nextSlide, 4100);
  };

  const nextSlide = () => {
    setCurrentImage(currentImage === images.length - 1 ? 0 : currentImage + 1);
  };

  useEffect(() => {
    setCurrentImage(0);
  }, []);

  useEffect(() => {
    if (autoScroll) {
      autoSlide();
    }
    return () => clearInterval(slideInterval);
  }, [currentImage]);

  const router = useRouter();

  const redirect = () => {
    router.push('/AuthPage');
  };

  return (
    <div
      className={`flex items-center justify-center h-screen mb-0 bg-fixed bg-center bg-cover ${
        currentImage === 0 && 'custom-img'
      } ${currentImage === 1 && 'custom-img1'} ${
        currentImage === 2 && 'custom-img2'
      }`}
      // className='flex items-center justify-center h-screen mb-0 bg-fixed bg-center bg-cover custom-img2'
    >
      <div className='absolute top-0 right-0 bottom-0 left-0 bg-black/70 z-[2]' />
      <div className='p-5 text-white z-[2]'>
        <h1
          className='text-9xl antialiased font-serif-thin hover:italic p-1 flex justify-center items-center'
          onClick={nextSlide}
        >
          Slice
        </h1>
        <h1 className='flex justify-center items-center mb-9'>
          Task Management
        </h1>
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
