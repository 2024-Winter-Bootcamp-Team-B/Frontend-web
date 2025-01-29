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
  const jailRef = useRef<HTMLDivElement | null>(null); // 감옥 참조
  const containerRef = useRef<HTMLDivElement | null>(null); // 컨테이너 참조

  const [blockedSites, setBlockedSites] = useState<string[]>([]); // 차단된 사이트 목록
  const [iconPositions, setIconPositions] = useState<{ x: number; y: number }[]>([]);
  const [iconVelocities, setIconVelocities] = useState<{ dx: number; dy: number }[]>([]);

  // 감옥 내부 하드코딩된 좌표 범위 (임의로 설정 가능)
  const JAIL_X_MIN = 60;  // 감옥 내부 X 최소 위치
  const JAIL_X_MAX = 945;  // 감옥 내부 X 최대 위치
  const JAIL_Y_MIN = 10;  // 감옥 내부 Y 최소 위치
  const JAIL_Y_MAX = 420;  // 감옥 내부 Y 최대 위치

  // 페이지 스크롤 비활성화
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100vh';
    return () => {
      document.body.style.overflow = 'auto';
      document.body.style.height = 'auto';
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

          // 감옥 내부 랜덤한 위치로 아이콘 배치 (하드코딩된 범위 내에서만 생성)
          setIconPositions(
            response.sites.map(() => ({
              x: Math.random() * (JAIL_X_MAX - JAIL_X_MIN) + JAIL_X_MIN,
              y: Math.random() * (JAIL_Y_MAX - JAIL_Y_MIN) + JAIL_Y_MIN,
            }))
          );

          // 랜덤한 방향으로 초기 속도 설정
          setIconVelocities(
            response.sites.map(() => ({
              dx: (Math.random() - 0.5) * 15, // 속도 조정 가능
              dy: (Math.random() - 0.5) * 15,
            }))
          );
        }
      })
      .catch((error) => console.error('Error fetching blocked sites:', error));
  }, [user_id]);

  // 아이콘이 감옥 내부에서 움직이도록 애니메이션 설정
  useEffect(() => {
    const interval = setInterval(() => {
      setIconPositions((prevPositions) =>
        prevPositions.map((pos, index) => {
          const velocity = iconVelocities[index];
          let newX = pos.x + velocity.dx;
          let newY = pos.y + velocity.dy;

          // 감옥 내부 경계 확인 후 반대 방향으로 튕기기
          if (newX < JAIL_X_MIN || newX > JAIL_X_MAX - 50) {
            velocity.dx *= -1;
            newX = Math.max(JAIL_X_MIN, Math.min(newX, JAIL_X_MAX - 50));
          }
          if (newY < JAIL_Y_MIN || newY > JAIL_Y_MAX - 50) {
            velocity.dy *= -1;
            newY = Math.max(JAIL_Y_MIN, Math.min(newY, JAIL_Y_MAX - 50));
          }

          return { x: newX, y: newY };
        })
      );
    }, 25); // 50ms 간격으로 업데이트

    return () => clearInterval(interval);
  }, [iconVelocities]);

  // 차단해제 버튼 클릭 이벤트
  const handleUnblockClick = () => {
    if (user_id) {
      navigate('/photo');
    } else {
      navigate('/login');
    }
  };

  return (
    <div ref={containerRef} className="section h-full relative" style={{ height: '100vh', overflow: 'hidden' }}>
      <div className="flex flex-col items-center h-[calc(100%-2.75rem)] px-16 py-8 gap-6 mt-11">
        {/* ProgressBar */}
        {user_id && <ProgressBar userId={user_id} />}

        <button
          className="bg-white rounded-full self-center mt-auto text-xl px-12 py-4 hover:text-white group relative flex items-center overflow-hidden"
          onClick={handleUnblockClick}
          style={{
            boxShadow: '0px 2px 8px 0px rgba(40, 41, 61, 0.08), 0px 20px 32px 0px rgba(96, 97, 112, 0.24)',
          }}
        >
          <span className="absolute h-15 top-0 left-0 w-0 h-full transition-all bg-focus-color opacity-100 group-hover:w-full duration-400 ease"></span>
          <span className="relative">차단해제</span>
        </button>

        {/* Jail 이미지와 아이콘 */}
        <div ref={jailRef} className="relative flex justify-center items-center">
          {/* 감옥 이미지 */}
          <img
            src={jail}
            alt="Jail"
            style={{
              width: '90vw',
              maxWidth: '1000px',
              height: 'auto',
              zIndex: 2,
            }}
          />

          {/* 아이콘 */}
          {blockedSites.map((site, index) => (
            <img
              key={site}
              src={`https://www.google.com/s2/favicons?sz=32&domain_url=${site}`}
              alt={site}
              style={{
                position: 'absolute',
                width: '40px',
                height: '40px',
                top: iconPositions[index]?.y || 0,
                left: iconPositions[index]?.x || 0,
                cursor: 'pointer',
                zIndex: 1, // 감옥 아래 배치
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UnblockPage;