import React, { useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const Chart = ({ completed, incomplete }) => {
  useEffect(() => {
    ChartJS.defaults.plugins.title.text = 'My Tasks';
    ChartJS.defaults.plugins.title.display = true;
    ChartJS.defaults.plugins.legend.display = true;
    ChartJS.defaults.responsive = false;
  });
  const data = {
    labels: ['Completed', 'Incomplete'],
    datasets: [
      {
        label: 'Tasks',
        data: [completed, incomplete],
        backgroundColor: ['rgb(54, 162, 235)', 'rgb(255, 99, 132)'],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <Doughnut
      data={data}
      width={350}
      height={350}
      options={{ maintainAspectRatio: false }}
    />
  );
};

export default Chart;
