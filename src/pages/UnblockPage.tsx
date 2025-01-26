import Navbar from '../components/Navbar';
import ProgressBar from '../components/ProgressBar';
import jail from '../assets/jail.svg';
import { checkReq, checkBlock } from '../api/checkBlock';
import { UnblockReq, unblockSites } from '../api/unblock';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const UnblockPage = ({ fullpageApi }: { fullpageApi: any }) => {
  const navigate = useNavigate();
  const { user_id } = useAuthStore();

  //차단 해제하기 API
  useEffect(() => {
    if (!user_id) {
      return;
    }
    const unblock: UnblockReq = {
      user_id,
      result: 1,
    };
    unblockSites(unblock)
      .then((response) => {
        if (response) {
          console.log(response);
        }
      })
      .catch((error) => console.error(error));
  });

  // 차단한 사이트 확인 API
  useEffect(() => {
    if (!user_id) {
      return;
    }
    const check: checkReq = {
      user_id,
    };
    checkBlock(check)
      .then((response) => {
        if (response) {
          console.log(response);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className='section h-full'>
      <Navbar fullpageApi={fullpageApi} />
      <div className='flex flex-col items-center h-[calc(100%-2.75rem)] px-16 py-8 gap-6'>
        <ProgressBar />
        <button
          onClick={() => navigate('/photo')}
          className='bg-white rounded-3xl w-24 h-12 active:bg-[#E5E5F0]'
          style={{
            boxShadow:
              '0px 2px 8px 0px rgba(40, 41, 61, 0.08), 0px 20px 32px 0px rgba(96, 97, 112, 0.24)',
          }}
        >
          차단 해제
        </button>
        <img src={jail} />
      </div>
    </div>
  );
};

export default UnblockPage;
