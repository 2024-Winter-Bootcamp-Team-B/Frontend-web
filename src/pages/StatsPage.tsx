import { useEffect, useState } from 'react';
import { fetchStat, StatReq } from '../api/stat';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  TooltipItem,
} from 'chart.js';
import useAuthStore from '../store/authStore';

// Chart.js 기본 설정 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const StatsPage = () => {
  const { user_id } = useAuthStore();
  const [labels, setLabels] = useState<string[]>([]); // x축 (date)
  const [goalData, setGoalData] = useState<number[]>([]); // y축 (goal)
  const [actualData, setActualData] = useState<number[]>([]); // y축 (actual)

  const data = {
    labels,
    datasets: [
      {
        label: '목표 집중 시간',
        data: goalData,
        borderWidth: 2,
        backgroundColor: 'rgba(255, 205, 86, 0.9)',
        borderColor: 'rgba(255, 205, 86, 1)',
        fill: true,
      },
      {
        label: '실제 집중 시간',
        data: actualData,
        borderWidth: 2,
        backgroundColor: 'rgba(54, 162, 235, 0.9)',
        borderColor: 'rgba(54, 162, 235, 1)',
        fill: true,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(200, 200, 200, 0.3)',
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          font: {
            size: 14,
            weight: 'bold',
          },
          color: '#555',
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        callbacks: {
          label: (context: TooltipItem<'line'>) =>
            `${context.dataset.label}: ${context.raw}분`,
        },
      },
    },
    animation: {
      duration: 1500,
      easing: 'easeOutBounce',
    },
  };

  useEffect(() => {
    if (!user_id) {
      return;
    }
    const stat: StatReq = {
      user_id,
    };
    fetchStat(stat)
      .then((response) => {
        if (response && response.result) {
          console.log(response);
          setLabels(response.result.map((item) => item.date)); // x축 (date)
          setGoalData(
            response.result.map((item) => parseInt(item.goal_min)), // y축 (goal)
          );
          setActualData(
            response.result.map((item) => parseInt(item.actual_min)), // y축 (actual)
          );
        }
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className='section h-full'>
      <div className='h-[calc(100%-2.75rem)] mt-11'>
        <Line data={data} options={options} className='h-screen' />
      </div>
    </div>
  );
};

export default StatsPage;
