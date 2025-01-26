import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // React Router의 useNavigate 훅 사용
import Logo from '../components/Logo';
import jail from '../assets/jail.svg';
import youtubeSvg from '../assets/youtube.svg';
import meme from '../assets/memeEx.svg';

const MemePage = () => {
  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅
  const containerRef = useRef<HTMLDivElement | null>(null); // 컨테이너를 참조
  const jailRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [iconPosition, setIconPosition] = useState({ x: 0, y: 0 });
  const [velocity, setVelocity] = useState({ dx: 0, dy: 0 });
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  const lastPositionRef = useRef({ x: 0, y: 0 });
  const lastTimestampRef = useRef(0);
  const inertiaRAF = useRef<number | null>(null);

   // 일정 시간이 지나면 main 페이지로 이동
   useEffect(() => {
    const timeout = setTimeout(() => {
      navigate('/#main'); // '/main' 경로로 이동
    }, 10000); // 5000ms (5초) 후에 이동

    return () => clearTimeout(timeout); // 컴포넌트가 언마운트될 때 타이머 제거
  }, [navigate]);


  // 컨테이너 크기 계산
  useEffect(() => {
    const updateContainerSize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setContainerSize({ width: rect.width, height: rect.height });
      }
    };

    updateContainerSize(); // 초기화
    window.addEventListener('resize', updateContainerSize); // 화면 크기 변경 감지

    return () => window.removeEventListener('resize', updateContainerSize);
  }, []);

  // useEffect(() => {
  //   // if (containerRef.current) {
  //   //   const containerRect = containerRef.current.getBoundingClientRect(); // 컨테이너 크기 가져오기
  //   //   setIconPosition({
  //   //     x: containerRect.width / 2 - 25, // 컨테이너의 가운데
  //   //     y: containerRect.height / 2 - 25, // 컨테이너의 가운데
  //   //   });
  //   // }

  // //   if (jailRef.current && containerRef.current) {
  // //     const jailRect = jailRef.current.getBoundingClientRect();
  // //     const containerRect = containerRef.current.getBoundingClientRect();
  
  // //     setIconPosition({
  // //       x: jailRect.left - containerRect.left + jailRect.width / 2 - 25, // 컨테이너 기준 X 좌표
  // //       y: jailRect.top - containerRect.top + jailRect.height / 2 - 25, // 컨테이너 기준 Y 좌표
  // //     });
  // //   }
  // // }, [containerSize]); // 컨테이너 크기 변화 감지

  //   const timeout = setTimeout(() => {
  //     if (jailRef.current && containerRef.current) {
  //       const jailRect = jailRef.current.getBoundingClientRect();
  //       const containerRect = containerRef.current.getBoundingClientRect();

  //       setIconPosition({
  //         x: jailRect.left - containerRect.left + jailRect.width / 2 - 25,
  //         y: jailRect.top - containerRect.top + jailRect.height / 2 - 25,
  //       });
  //     }
  //   }, 0.00000001); // 100ms 지연 (렌더링 완료를 보장)

  //   return () => clearTimeout(timeout);
  // }, [containerSize]);

  useEffect(() => {
    const updatePosition = () => {
      if (jailRef.current && containerRef.current) {
        const jailRect = jailRef.current.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();
  
        setIconPosition({
          x: jailRect.left - containerRect.left + jailRect.width / 2 - 25,
          y: jailRect.top - containerRect.top + jailRect.height / 2 - 25,
        });
      }
    };
  
    const raf = requestAnimationFrame(updatePosition);
  
    return () => cancelAnimationFrame(raf);
  }, [containerSize]);


  const handleMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
    setIsDragging(true);
    lastPositionRef.current = { x: e.clientX, y: e.clientY };
    setVelocity({ dx: 0, dy: 0 });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;

    const dx = e.clientX - lastPositionRef.current.x;
    const dy = e.clientY - lastPositionRef.current.y;

    setIconPosition((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
    lastPositionRef.current = { x: e.clientX, y: e.clientY };

    const timestamp = e.timeStamp;
    if (lastTimestampRef.current) {
      const dt = (timestamp - lastTimestampRef.current) / 1000;
      setVelocity({ dx: dx / dt, dy: dy / dt });
    }
    lastTimestampRef.current = timestamp;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    startInertia();
  };

  const startInertia = () => {
    const decay = 0.95;

    const animate = () => {
      setVelocity((prev) => {
        const newDx = prev.dx * decay;
        const newDy = prev.dy * decay;

        if (Math.abs(newDx) < 0.1 && Math.abs(newDy) < 0.1) {
          cancelAnimationFrame(inertiaRAF.current!);
          return { dx: 0, dy: 0 };
        }

        setIconPosition((pos) => {
          let newX = pos.x + newDx / 100;
          let newY = pos.y + newDy / 100;

          // 컨테이너 경계 순환 처리
          if (newX < -50) newX = containerSize.width;
          if (newX > containerSize.width) newX = -50;

          if (newY < -50) newY = containerSize.height;
          if (newY > containerSize.height) newY = -50;

          return { x: newX, y: newY };
        });

        return { dx: newDx, dy: newDy };
      });

      inertiaRAF.current = requestAnimationFrame(animate);
    };

    inertiaRAF.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div ref={containerRef} className="w-full h-full flex flex-col items-center px-16 py-8"> {/* 컨테이너 참조 */}
      <Logo />
      <div className="flex gap-8">

        <div className="flex flex-col grow w-full justify-between">

          <div className="text-white flex gap-4">
            <p className="font-cinzel font-bold text-2xl">FOCUS</p>
            <div className="bg-white w-full h-px self-center" />
          </div>

          <div className="font-semibold text-4xl">
            <p>전체 목표의 62.5%를 달성했습니다</p>
            <p>목표시간 4H 달성시간 2H 30M</p>
          </div>

          <div className="bg-white h-12 rounded-3xl" />

          <div className="jail-container w-full" ref={jailRef}>
            <img src={jail} alt="Jail" className="jail-image" />
            <svg
              className="youtube-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              viewBox="0 0 30 30"
              fill="none"
              style={{
                position: 'absolute',
                top: `${iconPosition.y}px`,
                left: `${iconPosition.x}px`,
                cursor: 'grab',
              }}
              onMouseDown={handleMouseDown}
            >
              <path d="M30 15C30 6.71573 23.2843 0 15 0C6.71574 0 0 6.71573 0 15C0 23.2843 6.71574 30 15 30C23.2843 30 30 23.2843 30 15Z" fill="#FF0209" />
              <path d="M21.3676 21.6431C20.9206 21.6916 20.4632 21.7 20.0247 21.699C16.6044 21.6958 13.184 21.6926 9.76471 21.6905C8.68854 21.6905 7.51645 21.6557 6.68482 20.9717C5.74778 20.1991 5.55278 18.8594 5.47689 17.6472C5.37149 15.9861 5.36306 14.3196 5.44949 12.6574C5.49692 11.7446 5.58019 10.8097 5.97334 9.98333C6.25582 9.38991 6.72698 8.85657 7.32989 8.5762C8.03082 8.2505 8.76443 8.30847 9.51912 8.30742C11.3257 8.30531 13.1324 8.30426 14.939 8.30215C16.8173 8.30004 18.6966 8.29898 20.5749 8.29688C21.4624 8.29688 22.4153 8.31479 23.1394 8.82811C24.0743 9.49005 24.3283 10.7496 24.4453 11.889C24.6614 13.9876 24.6646 16.1083 24.4538 18.2069C24.3663 19.0723 24.2208 19.9872 23.6506 20.6439C23.0856 21.2953 22.2477 21.5461 21.3686 21.642L21.3676 21.6431Z" fill="white" />
              <path d="M18.0595 14.9986L12.9622 12.0547V17.9415L18.0595 14.9986Z" fill="#FF0209" />
            </svg>
          </div>

        </div>

        <div className="grow w-full">
          <img src={meme} alt="Example Meme" />
        </div>
      </div>
    </div>
  );
};

export default MemePage;


// import Logo from '../components/Logo';
// import jail from '../assets/jail.svg';
// import meme from '../assets/memeEx.svg';

// const MemePage = () => {
//   return (
//     <div className='w-full flex flex-col items-center px-16 py-8'>
//       <Logo />
//       <div className='flex gap-8 h-full'>
//         <div className='flex flex-col grow w-full justify-between'>
//           <div className='text-white flex gap-4'>
//             <p className='font-cinzel font-bold text-2xl'>FOCUS</p>
//             <div className='bg-white w-full h-px self-center' />
//           </div>
//           <div className='font-semibold text-4xl'>
//             <p>전체 목표의 62.5%를 달성했습니다</p>
//             <p>목표시간 4H 달성시간 2H 30M</p>
//           </div>
//           <div className='bg-white h-12 rounded-3xl' />
//           <img src={jail} />
//         </div>
//         <div className='grow w-full'>
//           <img src={meme} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MemePage;
