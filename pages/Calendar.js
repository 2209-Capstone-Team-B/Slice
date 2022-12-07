import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const MyCalendar = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div
      onClick={() => {
        console.log(date);
      }}
      className='shadow-[0_15px_70px_-15px_rgba(0,0,0,0.3)]'
    >
      <Calendar onChange={setDate} value={date} />
    </div>
  );
};

export default MyCalendar;
