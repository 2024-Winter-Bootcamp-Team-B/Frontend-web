import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import { fetchStat, StatReq } from '../api/stat';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
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
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const StatsPage = () => {
  const { user_id } = useAuthStore();

  const data = {
    labels: ['월', '화', '수', '목', '금', '토', '일'],
    datasets: [
      {
        label: '목표 집중 시간',
        data: [7, 6, 7, 5, 4, 3, 8],
        borderWidth: 2,
        backgroundColor: 'rgba(255, 205, 86, 0.6)',
        borderColor: 'rgba(255, 205, 86, 1)',
      },
      {
        label: '실제 집중 시간',
        data: [6, 5, 6, 4, 3, 2, 7],
        borderWidth: 2,
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
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
          label: (context: TooltipItem<'bar'>) =>
            `${context.dataset.label}: ${context.raw}시간`,
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
        if (response) {
          console.log(response);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className='section h-full'>
      <Navbar />
      <div className='h-[calc(100%-2.75rem)]'>
        <Bar data={data} options={options} className='h-screen' />
      </div>
    </div>
  );
};

export default StatsPage;
