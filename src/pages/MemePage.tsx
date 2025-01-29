// import React, { useEffect, useRef, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Logo from '../components/Logo';
// import jailLeft from '../assets/jailLeft.svg';
// import jailRight from '../assets/jailRight.svg';
// import { checkReq, checkBlock } from '../api/checkBlock';
// import { getAllSites } from '../api/checkSites';
// import useAuthStore from '../store/authStore';
// import './MemePage.css';
// import {
//   ProgressBar,
//   DurationElapsedPercentage,
// } from '../components/ProgressBar';

const MemePage = () => {
  //   const navigate = useNavigate();
  //   const { user_id } = useAuthStore();
  //   const containerRef = useRef<HTMLDivElement | null>(null);
  //   const jailRef = useRef<HTMLDivElement | null>(null);
  //   const [iconPositions, setIconPositions] = useState<{ x: number; y: number }[]>([]); // iconPositions: 아이콘(차단된 사이트)의 현재 위치를 저장
  //   const [iconVelocities, setIconVelocities] = useState<{ dx: number; dy: number }[]>([]); // iconVelocities: 아이콘의 속도 (dx: x축 속도, dy: y축 속도)
  //   const [draggingIndex, setDraggingIndex] = useState<number | null>(null); // draggingIndex: 현재 드래그 중인 아이콘의 인덱스
  //   const [containerSize, setContainerSize] = useState({ width: 0, height: 0 }); // containerSize: 감옥 이미지가 위치한 컨테이너 크기
  //   const [isJailOpen, setIsJailOpen] = useState(false); // isJailOpen: 감옥 애니메이션(열림/닫힘) 상태
  //   const [blockedSites, setBlockedSites] = useState<string[]>([]); // blockedSites: 서버에서 가져온 차단된 사이트 목록
  //   const [randomMeme, setRandomMeme] = useState<string>(''); // randomMeme: 랜덤으로 선택된 Meme 이미지의 파일 경로.
  //   const [, setVelocity] = useState({ dx: 0, dy: 0 });
  //   const lastPositionRef = useRef({ x: 0, y: 0 });
  //   // 일정 시간이 지나면 main 페이지로 이동
  //   useEffect(() => {
  //     const timeout = setTimeout(() => {
  //       navigate('/#main'); // '/main' 경로로 이동
  //     }, 1000000); // (1000초) 후에 이동
  //     return () => clearTimeout(timeout);
  //   }, [navigate]);
  //   // 차단된 사이트 확인 - 이건 /blocked-site/{user_id} 이거랑 연결된 코드임
  //   // 가져온 사이트를 setBlockedSites로 상태에 저장하며, 아이콘 초기 위치(iconPositions)와 속도(iconVelocities)도 설정
  //   // useEffect(() => {
  //   //   if (!user_id) return;
  //   //   const check: checkReq = { user_id };
  //   //   checkBlock(check)
  //   //     .then((response) => {
  //   //       if (response?.sites) {
  //   //         setBlockedSites(response.sites);
  //   //         if (jailRef.current && containerRef.current) {
  //   //           const jailRect = jailRef.current.getBoundingClientRect();
  //   //           const containerRect = containerRef.current.getBoundingClientRect();
  //   //           const jailLeft = jailRect.left - containerRect.left; // 감옥 X 시작 좌표
  //   //           const jailTop = jailRect.top - containerRect.top; // 감옥 Y 시작 좌표
  //   //           const jailWidth = jailRect.width; // 감옥 너비
  //   //           const jailHeight = jailRect.height; // 감옥 높이
  //   //           setIconPositions(
  //   //             response.sites.map(() => ({
  //   //               x: Math.random() * (jailWidth - 50) + jailLeft, // 감옥 내부에서 X 랜덤
  //   //               y: Math.random() * (jailHeight - 50) + jailTop, // 감옥 내부에서 Y 랜덤
  //   //             }))
  //   //           );
  //   //         }
  //   //         setIconVelocities(response.sites.map(() => ({ dx: 0, dy: 0 })));
  //   //       }
  //   //     })
  //   //     .catch((error) => console.error(error));
  //   // }, [user_id]);
  //   // 차단된 사이트 확인 -> 이건 /sites 이거랑 연결된 코드
  //   // 가져온 사이트를 setBlockedSites로 상태에 저장하며, 아이콘 초기 위치(iconPositions)와 속도(iconVelocities)도 설정
  //   useEffect(() => {
  //     getAllSites()
  //       .then((sites) => {
  //         if (sites.length > 0) {
  //           setBlockedSites(sites);
  //           if (jailRef.current && containerRef.current) {
  //             const jailRect = jailRef.current.getBoundingClientRect();
  //             const containerRect = containerRef.current.getBoundingClientRect();
  //             // const jailLeft = jailRect.left - containerRect.left; // 감옥 X 시작 좌표
  //             // const jailTop = jailRect.top - containerRect.top; // 감옥 Y 시작 좌표
  //             // const jailWidth = jailRect.width; // 감옥 너비
  //             // const jailHeight = jailRect.height; // 감옥 높이
  //             // 📌 감옥 내부 하드코딩된 X, Y 범위
  //             // const JAIL_X_MIN = jailRect.left - containerRect.left + 10;  // 감옥 내부 X 최소값
  //             // const JAIL_X_MAX = jailRect.left - containerRect.left + jailRect.width - 100;  // 감옥 내부 X 최대값
  //             // const JAIL_Y_MIN = jailRect.top - containerRect.top + 10;  // 감옥 내부 Y 최소값
  //             // const JAIL_Y_MAX = jailRect.top - containerRect.top + jailRect.height - 100;  // 감옥 내부 Y 최대값
  //             // 📌 감옥 내부 위치를 하드코딩 (요청한 값 사용)
  //             const JAIL_X_MIN = 400;  // 감옥 내부 X 최소 위치
  //             const JAIL_X_MAX = 500;  // 감옥 내부 X 최대 위치
  //             const JAIL_Y_MIN = 600;  // 감옥 내부 Y 최소 위치
  //             const JAIL_Y_MAX = 800;  // 감옥 내부 Y 최대 위치
  //             setIconPositions(
  //               sites.map(() => ({
  //                 // x: Math.random() * (jailWidth - 50) + jailLeft, // 감옥 내부에서 X 랜덤
  //                 // y: Math.random() * (jailHeight - 50) + jailTop, // 감옥 내부에서 Y 랜덤
  //                 x: Math.random() * (JAIL_X_MAX - JAIL_X_MIN) + JAIL_X_MIN,
  //                 y: Math.random() * (JAIL_Y_MAX - JAIL_Y_MIN) + JAIL_Y_MIN,
  //               })),
  //             );
  //           }
  //           setIconVelocities(sites.map(() => ({ dx: 0, dy: 0 })));
  //         }
  //       })
  //       .catch((error) => {
  //         console.error('Error fetching all sites:', error);
  //       });
  //   }, []); // user_id는 더 이상 필요하지 않으므로 의존성 배열에서 제거
  //   // 컨테이너 크기 계산
  //   useEffect(() => {
  //     const updateContainerSize = () => {
  //       if (containerRef.current) {
  //         const rect = containerRef.current.getBoundingClientRect();
  //         setContainerSize({ width: rect.width, height: rect.height });
  //       }
  //     };
  //     // DOM이 마운트된 직후 크기 설정
  //     if (containerRef.current) {
  //       updateContainerSize();
  //     }
  //     // resize 이벤트 리스너 추가
  //     window.addEventListener('resize', updateContainerSize);
  //     return () => {
  //       window.removeEventListener('resize', updateContainerSize);
  //     };
  //   }, [containerRef.current]);
  //   // 랜덤 MEME 이미지 선택
  //   useEffect(() => {
  //     const randomIndex = Math.floor(Math.random() * 38) + 1;
  //     const randomFileName = `src/assets/MEMEimg/${randomIndex}.png`;
  //     setRandomMeme(randomFileName);
  //   }, []);
  //   // 감옥 애니메이션 트리거
  //   useEffect(() => {
  //     const timeout = setTimeout(() => setIsJailOpen(true), 50);
  //     return () => clearTimeout(timeout);
  //   }, []);
  //   // 드래그 시작
  //   // 사용자가 아이콘을 클릭하면 draggingIndex를 해당 아이콘 인덱스로 설정.
  //   // 마우스 클릭 시작 위치(e.clientX, e.clientY)를 저장.
  //   // const handleMouseDown = (
  //   //   e: React.MouseEvent<HTMLImageElement>,
  //   //   index: number,
  //   // ) => {
  //   //   if (containerSize.width === 0 || containerSize.height === 0) {
  //   //     console.warn('Invalid container size:', containerSize);
  //   //     return; // 컨테이너 크기가 초기화되지 않았다면 무시
  //   //   }
  //   //   setDraggingIndex(index);
  //   //   lastPositionRef.current = { x: e.clientX, y: e.clientY };
  //   //   setVelocity({ dx: 0, dy: 0 });
  //   // };
  //   // 드래그 중
  //   // 마우스를 움직일 때 드래그 중인 아이콘의 위치를 업데이트
  //   // 아이콘이 컨테이너 영역을 벗어나지 않도록 Math.min과 Math.max를 사용
  //   // const handleMouseMove = (e: MouseEvent) => {
  //   //   if (draggingIndex === null) return;
  //   //   if (containerSize.width <= 50 || containerSize.height <= 50) {
  //   //     console.log('Invalid container size:', containerSize);
  //   //     return;
  //   //   }
  //   //   const dx = e.clientX - lastPositionRef.current.x;
  //   //   const dy = e.clientY - lastPositionRef.current.y;
  //   //   console.log(`Dragging icon index: ${draggingIndex}, dx: ${dx}, dy: ${dy}`);
  //   //   setIconPositions((prev) =>
  //   //     prev.map((pos, i) =>
  //   //       i === draggingIndex
  //   //         ? {
  //   //             x: Math.min(Math.max(pos.x + dx, 0), containerSize.width - 50),
  //   //             y: Math.min(Math.max(pos.y + dy, 0), containerSize.height - 50),
  //   //           }
  //   //         : pos,
  //   //     ),
  //   //   );
  //   //   setIconVelocities((prev) =>
  //   //     prev.map((vel, i) => (i === draggingIndex ? { dx, dy } : vel)),
  //   //   );
  //   //   lastPositionRef.current = { x: e.clientX, y: e.clientY };
  //   // };
  //   // 드래그 종료
  //   // 마우스 버튼을 떼면 드래그가 종료되며, 관성 효과를 시작
  //   // const handleMouseUp = () => {
  //   //   if (draggingIndex !== null) {
  //   //     startInertia(draggingIndex); // 해당 아이콘만 관성 효과 적용
  //   //     setDraggingIndex(null);
  //   //   }
  //   // };
  //   // 관성 애니메이션
  //   // decay 값을 사용해 속도를 점차 줄이는 애니메이션.
  //   // 아이콘이 컨테이너 경계를 넘어가면 반대쪽에서 다시 나타나도록 설정.
  //   // const startInertia = (index: number) => {
  //   //   const decay = 0.95;
  //   //   const animate = () => {
  //   //     setIconPositions((prevPositions) =>
  //   //       prevPositions.map((pos, i) => {
  //   //         if (i !== index) return pos; // 현재 애니메이션 중인 아이콘만 처리
  //   //         const vel = iconVelocities[i];
  //   //         let newDx = vel.dx * decay;
  //   //         let newDy = vel.dy * decay;
  //   //         // 속도가 충분히 작으면 애니메이션 중단
  //   //         if (Math.abs(newDx) < 0.1 && Math.abs(newDy) < 0.1) {
  //   //           return pos;
  //   //         }
  //   //         let newX = pos.x + newDx;
  //   //         let newY = pos.y + newDy;
  //   //         // 컨테이너 경계 처리
  //   //         if (newX < -50) newX = containerSize.width;
  //   //         if (newX > containerSize.width) newX = -50;
  //   //         if (newY < -50) newY = containerSize.height;
  //   //         if (newY > containerSize.height) newY = -50;
  //   //         return { x: newX, y: newY }; // 새로운 위치 반환
  //   //       }),
  //   //     );
  //   //     setIconVelocities((prevVelocities) =>
  //   //       prevVelocities.map((vel, i) => {
  //   //         if (i !== index) return vel;
  //   //         const newDx = vel.dx * decay;
  //   //         const newDy = vel.dy * decay;
  //   //         return {
  //   //           dx: Math.abs(newDx) < 0.1 ? 0 : newDx,
  //   //           dy: Math.abs(newDy) < 0.1 ? 0 : newDy,
  //   //         };
  //   //       }),
  //   //     );
  //   //     // 속도가 충분히 작으면 애니메이션 종료
  //   //     const currentVelocity = iconVelocities[index];
  //   //     if (
  //   //       Math.abs(currentVelocity.dx || 0) >= 0.1 ||
  //   //       Math.abs(currentVelocity.dy || 0) >= 0.1
  //   //     ) {
  //   //       requestAnimationFrame(animate);
  //   //     }
  //   //   };
  //   //   requestAnimationFrame(animate); // 아이콘별로 독립적으로 실행
  //   // };
  //   // 이벤트 리스너 설정
  //   // useEffect(() => {
  //   //   if (draggingIndex !== null) {
  //   //     document.addEventListener('mousemove', handleMouseMove);
  //   //     document.addEventListener('mouseup', handleMouseUp);
  //   //   } else {
  //   //     document.removeEventListener('mousemove', handleMouseMove);
  //   //     document.removeEventListener('mouseup', handleMouseUp);
  //   //   }
  //   //   return () => {
  //   //     document.removeEventListener('mousemove', handleMouseMove);
  //   //     document.removeEventListener('mouseup', handleMouseUp);
  //   //   };
  //   // }, [draggingIndex]);
  //   // DurationElapsedPercentage에 user_id 전달
  //   const percentageData = user_id ? DurationElapsedPercentage(user_id) : null;
  //   if (!percentageData) {
  //     return (
  //       <div className='font-semibold text-4xl'>
  //         <p>목표 진행 데이터를 불러오는 중입니다...</p>
  //       </div>
  //     );
  //   }
  //   const [totalDuration, elapsedTime, percentage] = percentageData;
  //   return (
  //     <div
  //       ref={containerRef}
  //       className='w-full h-full flex flex-col items-center px-16 py-8'
  //       style={{ overflow: 'hidden' }}
  //     >
  //       <Logo />
  //       <div className='flex gap-8'>
  //         <div className='flex flex-col grow w-full justify-between'>
  //           <div className='text-white flex gap-4'>
  //             <p className='font-cinzel font-bold text-2xl'>FOCUS</p>
  //             <div className='bg-white w-full h-px self-center' />
  //           </div>
  //           <div className='font-semibold text-4xl'>
  //             <p>전체 목표의 {percentage}%를 달성했습니다</p>
  //             <p>
  //               목표시간 {totalDuration}, 달성시간 {elapsedTime}
  //             </p>
  //           </div>
  //           {/* ProgressBar에 user_id 전달 */}
  //           {user_id && <ProgressBar userId={user_id} />}
  //           <div
  //             className={`jail-container w-full flex ${isJailOpen ? 'jail-open' : ''}`}
  //             ref={jailRef}
  //           >
  //             <img
  //               src={jailLeft}
  //               alt='Jail Left'
  //               className={`jail-left ${isJailOpen ? 'open' : ''}`}
  //             />
  //             {blockedSites.map((site, index) => (
  //               <img
  //                 key={site} // 고유한 key 사용
  //                 src={`https://www.google.com/s2/favicons?sz=32&domain_url=${site}`}
  //                 alt={`Favicon for ${site}`}
  //                 width={40}
  //                 height={40}
  //                 className='icon'
  //                 style={{
  //                   position: 'absolute',
  //                   top: `${iconPositions[index]?.y || 0}px`,
  //                   left: `${iconPositions[index]?.x || 0}px`,
  //                   cursor: 'grab',
  //                 }}
  //                 // onMouseDown={(e) => {
  //                 //   handleMouseDown(e, index);
  //                 // }}
  //               />
  //             ))}
  //             <img
  //               src={jailRight}
  //               alt='Jail Right'
  //               className={`jail-right ${isJailOpen ? 'open' : ''}`}
  //             />
  //           </div>
  //         </div>
  //         <div className='grow w-full'>
  //           <img src={randomMeme} alt='Random Meme' />
  //         </div>
  //       </div>
  //     </div>
  //   );
};

export default MemePage;
