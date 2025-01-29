import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import jailLeft from '../assets/jailLeft.svg';
import jailRight from '../assets/jailRight.svg';
import { getAllSites } from '../api/checkSites';
import useAuthStore from '../store/authStore';
import './MemePage.css';
import {
  ProgressBar,
  DurationElapsedPercentage,
} from '../components/ProgressBar';

const MemePage = () => {
  const navigate = useNavigate();
  const { user_id } = useAuthStore();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [iconPositions, setIconPositions] = useState<
    { x: number; y: number }[]
  >([]);
  const [iconVelocities, setIconVelocities] = useState<
    { dx: number; dy: number }[]
  >([]);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [isJailOpen, setIsJailOpen] = useState(false);
  const [blockedSites, setBlockedSites] = useState<string[]>([]);
  const [randomMeme, setRandomMeme] = useState<string>('');
  const [shouldMove, setShouldMove] = useState(false); // 3초 후에 움직이도록 설정

  // 페이지 로드 후 일정 시간 후에 메인 페이지로 이동
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate('/#main');
    }, 10000); // 10초 후
    return () => clearTimeout(timeout);
  }, [navigate]);

  // 감옥 내부 위치를 하드코딩 (요청한 값 사용)
  const JAIL_X_MIN = 350; // 감옥 내부 X 최소 위치
  const JAIL_X_MAX = 500; // 감옥 내부 X 최대 위치
  const JAIL_Y_MIN = 530; // 감옥 내부 Y 최소 위치
  const JAIL_Y_MAX = 800; // 감옥 내부 Y 최대 위치

  // 차단된 사이트 불러오기 & 초기 아이콘 배치
  useEffect(() => {
    getAllSites()
      .then((sites) => {
        if (sites.length > 0) {
          setBlockedSites(sites);

          setTimeout(() => {
            if (containerRef.current) {
              const containerRect =
                containerRef.current.getBoundingClientRect();
              setContainerSize({
                width: containerRect.width,
                height: containerRect.height,
              });

              // 아이콘의 초기 위치를 설정 (하드코딩)
              const initialPositions = sites.map(() => ({
                x: Math.random() * (JAIL_X_MAX - JAIL_X_MIN) + JAIL_X_MIN,
                y: Math.random() * (JAIL_Y_MAX - JAIL_Y_MIN) + JAIL_Y_MIN,
              }));

              setIconPositions(initialPositions);

              // 아이콘이 3초 후에 움직이도록 설정
              setTimeout(() => {
                setIconVelocities(
                  sites.map(() => ({
                    dx: (Math.random() - 0.1) * 20, // 랜덤 속도
                    dy: (Math.random() - 0.1) * 20,
                  })),
                );
                setShouldMove(true); // 1.5초 후 움직임 시작
              }, 1500);
            }
          }, 10); // 감옥 크기가 로딩될 시간을 확보
        }
      })
      .catch((error) => console.error('Error fetching all sites:', error));
  }, []);

  // 컨테이너 크기 계산
  useEffect(() => {
    const updateContainerSize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setContainerSize({ width: rect.width, height: rect.height });
      }
    };

    if (containerRef.current) {
      updateContainerSize();
    }

    window.addEventListener('resize', updateContainerSize);
    return () => {
      window.removeEventListener('resize', updateContainerSize);
    };
  }, []);

  // 랜덤 MEME 이미지 선택
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * 38) + 1;
    setRandomMeme(`src/assets/MEMEimg/${randomIndex}.png`);
  }, []);

  // 감옥 애니메이션 트리거
  useEffect(() => {
    const timeout = setTimeout(() => setIsJailOpen(true), 50);
    return () => clearTimeout(timeout);
  }, []);

  // 아이콘이 일정 시간이 지난 후 움직이기 시작
  useEffect(() => {
    if (!shouldMove) return; // 1.5초 후에 움직이도록 설정

    const moveIcons = () => {
      setIconPositions((prevPositions) =>
        prevPositions.map((pos, index) => {
          let newX = pos.x + iconVelocities[index].dx;
          let newY = pos.y + iconVelocities[index].dy;

          // 화면 경계를 벗어나면 반대쪽에서 등장하도록 설정
          if (newX < 0) newX = containerSize.width - 50;
          if (newX > containerSize.width - 50) newX = 0;
          if (newY < 0) newY = containerSize.height - 50;
          if (newY > containerSize.height - 50) newY = 0;

          return { x: newX, y: newY };
        }),
      );
    };

    const interval = setInterval(moveIcons, 30);

    return () => clearInterval(interval);
  }, [shouldMove, iconVelocities, containerSize]);

  // DurationElapsedPercentage에 user_id 전달
  const percentageData = user_id ? DurationElapsedPercentage(user_id) : null;
  if (!percentageData) {
    return (
      <div className='font-semibold text-4xl'>
        <p>목표 진행 데이터를 불러오는 중입니다...</p>
      </div>
    );
  }
  const [totalDuration, elapsedTime, percentage] = percentageData;

  return (
    <div
      ref={containerRef}
      className='w-full h-full flex flex-col items-center px-16 py-8'
      style={{ overflow: 'hidden', position: 'relative' }}
    >
      <Logo />
      <div className='flex gap-8'>
        <div className='flex flex-col grow w-full justify-between'>
          <div className='text-white flex gap-4'>
            <p className='font-cinzel font-bold text-2xl'>FOCUS</p>
            <div className='bg-white w-full h-px self-center' />
          </div>
          <div className='font-semibold text-4xl'>
            <p>전체 목표의 {percentage}%를 달성했습니다</p>
            <p>
              목표시간 {totalDuration}, 달성시간 {elapsedTime}
            </p>
          </div>
          {user_id && <ProgressBar userId={user_id} />}
          <div
            className={`jail-container w-full flex ${isJailOpen ? 'jail-open' : ''}`}
          >
            <img
              src={jailLeft}
              alt='Jail Left'
              className={`jail-left ${isJailOpen ? 'open' : ''}`}
            />
            {blockedSites.map((site, index) => (
              <img
                key={site}
                src={`https://www.google.com/s2/favicons?sz=32&domain_url=${site}`}
                alt={`Favicon for ${site}`}
                width={40}
                height={40}
                className='icon'
                style={{
                  position: 'absolute',
                  top: `${iconPositions[index]?.y || 0}px`,
                  left: `${iconPositions[index]?.x || 0}px`,
                }}
              />
            ))}
            <img
              src={jailRight}
              alt='Jail Right'
              className={`jail-right ${isJailOpen ? 'open' : ''}`}
            />
          </div>
        </div>
        <div className='grow w-full'>
          <img src={randomMeme} alt='Random Meme' />
        </div>
      </div>
    </div>
  );
};

export default MemePage;
