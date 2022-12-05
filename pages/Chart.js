import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const Chart = ({ completed, incomplete }) => {
  const data = {
    labels: ['Completed', 'Incomplete'],
    datasets: [
      {
        label: 'My First Dataset',
        data: [completed, incomplete],
        backgroundColor: ['rgb(54, 162, 235)', 'rgb(255, 99, 132)'],
        hoverOffset: 4,
      },
    ],
  };

  return <Doughnut data={data} />;
};

export default Chart;
