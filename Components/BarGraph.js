import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  registerables,
} from 'chart.js';
import { useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

ChartJS.register(...registerables, Tooltip, Legend);

const BarGraph = ({ ecosystemMembers }) => {
  useEffect(() => {
    ChartJS.defaults.plugins.legend.display = false;
  });

  const data = {
    labels: ecosystemMembers.map((member) => member.userName),
    datasets: [
      {
        barPercentage: 0.5,
        barThickness: 50,
        maxBarThickness: 800,
        minBarLength: 2,
        data: ecosystemMembers.map((member) => member.currencyAmount),
        backgroundColor: ecosystemMembers.map((member) => member.color),
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        min: 0,
        stepSize: 10,
      },
      x: {},
    },
  };
  return <Bar data={data} options={options} />;
};

export default BarGraph;
