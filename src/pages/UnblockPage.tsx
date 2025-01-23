import Navbar from '../components/Navbar';
import jail from '../assets/jail.svg';
import { checkReq, checkBlock } from '../api/checkBlock';
import { UnblockReq, unblockSites } from '../api/unblock';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UnblockPage = ({ fullpageApi }: { fullpageApi: any }) => {
  const navigate = useNavigate();

  //차단 해제하기 API
  useEffect(() => {
    const unblock: UnblockReq = {
      user_id: 1,
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
    const check: checkReq = {
      user_id: 1,
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
        <div className='bg-white w-[800px] h-12 rounded-3xl' />
        <button
          onClick={() => navigate('/photo')}
          className='bg-white rounded-3xl w-24 h-12'
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
