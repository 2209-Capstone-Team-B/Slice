import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const MyCalendar = () => {
  const [date, setDate] = useState(new Date());

  return (
    <button
      onClick={() => {
        console.log(date);
      }}
    >
      <Calendar onChange={setDate} value={date} />
    </button>
  );
};

export default MyCalendar;
