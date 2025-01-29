// import { ProgressBar } from '../components/ProgressBar';
// import jail from '../assets/jail.svg';
// import { checkReq, checkBlock } from '../api/checkBlock';
// // import { UnblockReq, unblockSites } from '../api/unblock';
// import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import useAuthStore from '../store/authStore';

// const UnblockPage = () => {
//   const navigate = useNavigate();
//   const { user_id } = useAuthStore();

//   //차단 해제하기 API
//   // useEffect(() => {
//   //   if (!user_id) {
//   //     return;
//   //   }
//   //   const unblock: UnblockReq = {
//   //     user_id,
//   //     result: 1,
//   //   };
//   //   unblockSites(unblock)
//   //     .then((response) => {
//   //       if (response) {
//   //         console.log(response);
//   //       }
//   //     })
//   //     .catch((error) => console.error(error));
//   // });

//   // 차단한 사이트 확인 API
//   useEffect(() => {
//     if (!user_id) {
//       return;
//     }
//     const check: checkReq = {
//       user_id,
//     };
//     checkBlock(check)
//       .then((response) => {
//         if (response) {
//           console.log(response);
//         }
//       })
//       .catch((error) => console.error(error));
//   }, []);

//   return (
//     <div className='section h-full'>
//       <div className='flex flex-col items-center h-[calc(100%-2.75rem)] px-16 py-8 gap-6 mt-11'>

//         {/* ProgressBar에 user_id 전달 */}
//         {user_id && <ProgressBar userId={user_id} />}

//         <button
//           className='bg-white rounded-full self-center mt-auto text-xl px-12 py-4 hover:text-white group relative flex items-center overflow-hidden '
//           onClick={() => navigate('/photo')}
//           style={{
//             boxShadow:
//               '0px 2px 8px 0px rgba(40, 41, 61, 0.08), 0px 20px 32px 0px rgba(96, 97, 112, 0.24)',
//           }}
//         >
//           <span className='absolute h-15 top-0 left-0 w-0 h-full transition-all bg-focus-color opacity-100 group-hover:w-full duration-400 ease'></span>
//           <span className='relative'>차단해제</span>
//         </button>
//         <img src={jail} />
//       </div>
//     </div>
//   );
// };

// export default UnblockPage;

import { useEffect, useRef, useState } from 'react';
import { ProgressBar } from '../components/ProgressBar';
import jail from '../assets/jail.svg';
import { checkReq, checkBlock } from '../api/checkBlock'; // checkBlock API
import useAuthStore from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import './UnblockPage.css';

const UnblockPage = () => {
  const navigate = useNavigate();
  const { user_id } = useAuthStore();
  const jailRef = useRef<HTMLDivElement | null>(null); // jail 이미지 참조
  const containerRef = useRef<HTMLDivElement | null>(null); // 전체 컨테이너 참조

  const [blockedSites, setBlockedSites] = useState<string[]>([]); // 차단된 사이트 목록
  const [iconPositions, setIconPositions] = useState<
    { x: number; y: number }[]
  >([]); // 아이콘 위치
  const [, setIconVelocities] = useState<{ dx: number; dy: number }[]>([]); // 아이콘 속도

  // 페이지 스크롤 비활성화
  useEffect(() => {
    document.body.style.overflow = 'hidden'; // 스크롤 비활성화
    return () => {
      document.body.style.overflow = 'auto'; // 컴포넌트가 언마운트될 때 복원
    };
  }, []);

  // 차단된 사이트 가져오기
  useEffect(() => {
    if (!user_id) return;

    const check: checkReq = { user_id };

    checkBlock(check)
      .then((response) => {
        if (response?.sites) {
          setBlockedSites(response.sites);

          if (jailRef.current && containerRef.current) {
            const jailRect = jailRef.current.getBoundingClientRect();
            const containerRect = containerRef.current.getBoundingClientRect();

            const jailLeft = jailRect.left - containerRect.left; // 감옥 X 시작 좌표
            const jailTop = jailRect.top - containerRect.top; // 감옥 Y 시작 좌표
            const jailWidth = jailRect.width; // 감옥 너비
            const jailHeight = jailRect.height; // 감옥 높이

            // 감옥 안쪽으로 아이콘 초기 위치 제한
            setIconPositions(
              response.sites.map(() => ({
                x:
                  Math.random() * (jailWidth * 0.5) +
                  jailLeft +
                  jailWidth * 0.1, // 감옥 중앙 근처에서 X 랜덤
                y:
                  Math.random() * (jailHeight * 0.5) +
                  jailTop +
                  jailHeight * 0.001, // 감옥 중앙 근처에서 Y 랜덤
              })),
            );
          }

          setIconVelocities(response.sites.map(() => ({ dx: 0, dy: 0 }))); // 초기 속도 설정
        }
      })
      .catch((error) => console.error('Error fetching blocked sites:', error));
  }, [user_id]);

  // 차단해제 누르기 전 user_id 있는지 검사
  const handleUnblockClick = () => {
    if (user_id) {
      navigate('/photo');
    } else {
      navigate('/login');
    }
  };

  return (
    <div ref={containerRef} className='section h-full relative'>
      <div className='flex flex-col items-center h-[calc(100%-2.75rem)] px-16 py-8 gap-6 mt-11'>
        {/* ProgressBar */}
        {user_id && <ProgressBar userId={user_id} />}

        <button
          className='bg-white rounded-full self-center mt-auto text-xl px-12 py-4 hover:text-white group relative flex items-center overflow-hidden'
          onClick={handleUnblockClick}
          style={{
            boxShadow:
              '0px 2px 8px 0px rgba(40, 41, 61, 0.08), 0px 20px 32px 0px rgba(96, 97, 112, 0.24)',
          }}
        >
          <span className='absolute h-15 top-0 left-0 w-0 h-full transition-all bg-focus-color opacity-100 group-hover:w-full duration-400 ease'></span>
          <span className='relative'>차단해제</span>
        </button>

        {/* Jail 이미지와 아이콘 */}
        <div
          ref={jailRef}
          className='relative flex justify-center items-center'
        >
          {/* 감옥 이미지 */}
          <img
            src={jail}
            alt='Jail'
            style={{
              width: '5000px', // 감옥 너비
              height: 'auto', // 비율 유지
            }}
          />

          {/* 아이콘 */}
          {blockedSites.map((site, index) => (
            <img
              key={site}
              src={`https://www.google.com/s2/favicons?sz=32&domain_url=${site}`} // favicon 사용
              alt={site}
              style={{
                position: 'absolute',
                width: '50px',
                height: '50px',
                top: iconPositions[index]?.y || 0,
                left: iconPositions[index]?.x || 0,
                cursor: 'pointer',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UnblockPage;
