import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import { fetchStat, StatReq } from '../api/stat';

const StatsPage = () => {
  useEffect(() => {
    const stat: StatReq = {
      user_id: 1,
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
    </div>
  );
};

export default StatsPage;
