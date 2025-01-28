import { useState, useEffect } from 'react';
import { BlockInfo } from '../api/blockInfo';

type BlockInfo = {
  startTime: string; // ISO 형식 날짜 문자열
  goalTime: string; // ISO 형식 날짜 문자열
};

const ProgressBar = () => {
  const [progress, setProgress] = useState(0);
  const [blockInfo, setBlockInfo] = useState<BlockInfo | null>(null);

  //startTime, goalTime 받아옴
  useEffect(() => {
    BlockInfo()
      .then((data) => {
        if (data) {
          setBlockInfo({
            startTime: data.start_time,
            goalTime: data.goal_time,
          });
        }
      })
      .catch((error) => {
        console.error('Error fetching block info:', error);
      });
  }, []);

  //Progress 업데이트 함수
  useEffect(() => {
    if (!blockInfo) return;

    // 1. ProgressBar 업데이트
    const interval = setInterval(() => {
      // 현재 시간을 KST(한국 표준시)로 변환
      const currentTimeUTC = new Date();
      const currentTimeKST = new Date(
        currentTimeUTC.getTime() + 9 * 60 * 60 * 1000,
      ); // UTC + 9시간

      // blockInfo의 startTime과 goalTime도 Date 객체로 변환
      const startTime = new Date(blockInfo.startTime);
      const goalTime = new Date(blockInfo.goalTime);
      // 사용자가 11:00(사용자는 KST라고 생각)를 입력하면 DB에 11:00(UTC)가 저장되고, 그대로 11:00(UTC)로 넘어온다고 가정함.
      // 11:00(KST) 입력했을 때 2:00(UTC)로 바뀌어 저장되는 일이 일어나지 않는다고 가정함.

      // 차단 시간 총 길이와 경과 시간 계산
      const totalDuration = goalTime.getTime() - startTime.getTime(); // 총 차단 시간 (밀리초)
      const elapsedTime = currentTimeKST.getTime() - startTime.getTime(); // 경과 시간 (밀리초)

      // 진행률 계산 및 상태 업데이트
      const newProgress = Math.max(
        0,
        Math.min(100, (elapsedTime / totalDuration) * 100),
      );
      setProgress(newProgress);
    }, 1000); // 1초마다 업데이트

    // 컴포넌트 언마운트 시 정리
    return () => clearInterval(interval);
  }, [blockInfo]);

  // 로딩 중 메시지
  if (!blockInfo) {
    return <p>Loading progress...</p>;
  }

  return (
    <div className='w-full max-w-7xl mx-auto'>
      <div className='relative w-full h-12 bg-white rounded-full'>
        <div
          className='absolute h-12 bg-progressbar-color rounded-full'
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className='mt-2 text-center text-sm'>{progress.toFixed(1)}%</p>
    </div>
  );
};

export default ProgressBar;
