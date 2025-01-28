import { ProgressBar } from '../components/ProgressBar';
import jail from '../assets/jail.svg';
import { checkReq, checkBlock } from '../api/checkBlock';
// import { UnblockReq, unblockSites } from '../api/unblock';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const UnblockPage = () => {
  const navigate = useNavigate();
  const { user_id } = useAuthStore();

  //차단 해제하기 API
  // useEffect(() => {
  //   if (!user_id) {
  //     return;
  //   }
  //   const unblock: UnblockReq = {
  //     user_id,
  //     result: 1,
  //   };
  //   unblockSites(unblock)
  //     .then((response) => {
  //       if (response) {
  //         console.log(response);
  //       }
  //     })
  //     .catch((error) => console.error(error));
  // });

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
      <div className='flex flex-col items-center h-[calc(100%-2.75rem)] px-16 py-8 gap-6 mt-11'>
        <ProgressBar />
        <button
          className='bg-white rounded-full self-center mt-auto text-xl px-12 py-4 hover:text-white group relative flex items-center overflow-hidden '
          onClick={() => navigate('/photo')}
          style={{
            boxShadow:
              '0px 2px 8px 0px rgba(40, 41, 61, 0.08), 0px 20px 32px 0px rgba(96, 97, 112, 0.24)',
          }}
        >
          <span className='absolute h-15 top-0 left-0 w-0 h-full transition-all bg-focus-color opacity-100 group-hover:w-full duration-400 ease'></span>
          <span className='relative'>차단해제</span>
        </button>
        <img src={jail} />
      </div>
    </div>
  );
};

export default UnblockPage;
