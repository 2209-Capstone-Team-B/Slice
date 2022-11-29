import React from 'react';

const dashboard = () => {
  return (
    <div className='bg-white h-screen flex justify-center items-stretch'>
      {/* <div className='w-screen flex justify-center items-center pb-0'> */}
      <div className='text-black border border-black p-3 w-5/12 h-3/4 m-auto rounded-3xl'>
        Div1
      </div>
      <div className='w-5/12 h-3/4 m-auto rounded-3xl relative'>
        <div className='text-black border border-black p-3 mb-10 w-11/12 height rounded-3xl'>
          Div 2
        </div>
        <div className='text-black border border-black p-3 w-11/12 height rounded-3xl absolute bottom-0 left-0'>
          Div 3
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default dashboard;
