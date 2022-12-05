import React, { useState } from 'react';
import Calendar from 'react-calendar';
// import "react-calendar/dist/calendar.css";

const MyCalendar = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div
      onClick={() => {
        console.log(date);
      }}
    >
      <Calendar onChange={setDate} value={date} />
    </div>
  );
};

export default MyCalendar;
