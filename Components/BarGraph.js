import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  registerables,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(...registerables, Tooltip, Legend);

const BarGraph = () => {
  const data = {
    labels: ['Scott', 'Mike', 'Cadre', 'Tasdid', 'Allan', 'Sarah', 'Emily'],
    datasets: [
      {
        barPercentage: 0.5,
        barThickness: 50,
        maxBarThickness: 800,
        minBarLength: 2,
        data: [1, 6, 7, 4, 5, 2, 3],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(170, 239, 139)',
          'rgb(137, 167, 178)',
          'rgb(107, 32, 173)',
          'rgb(244, 175, 24)',
          'rgb(204, 38, 26)',
        ],
        hoverOffset: 4,
      },
    ],
  };

  return <Bar data={data} />;
};

export default BarGraph;
