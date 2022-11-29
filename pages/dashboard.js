import React from 'react';

const dashboard = () => {
  return (
    <div className='bg-amber-100 h-screen flex justify-center items-stretch'>
      <div className='text-black border border-black p-3 w-5/12 h-3/4 m-auto rounded-3xl'>
        Div1
      </div>
      <div className='p-3 w-5/12 h-3/4 m-auto rounded-3xl'>
        <div className='text-black border border-black p-3 w-7/12 h-2/4 rounded-3xl'>Div 2</div>
      </div>
      {/* <div className='flex flex-col w-7/12'>
        <div className='text-black border border-black p-3 w-5/12 h-2/6 rounded-3xl'>
          Div2
        </div>
        <div className='text-black border border-black p-3 w-5/12 h-2/6 rounded-3xl'>
          Div3
        </div>
      </div> */}
    </div>
  );
};

export default dashboard;
