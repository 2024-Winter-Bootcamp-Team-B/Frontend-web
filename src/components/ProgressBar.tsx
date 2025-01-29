import { useState, useEffect } from 'react';
import { BlockInfo } from '../api/blockInfo';

// BlockInfo 타입 정의
export type BlockInfoType = {
  startTime: string; // ISO 형식 날짜 문자열
  goalTime: string; // ISO 형식 날짜 문자열
};

// 공통 유틸 함수: BlockInfo 가져오기

const useBlockInfo = (userId: number) => {
  const [blockInfo, setBlockInfo] = useState<BlockInfoType | null>(null);

  useEffect(() => {
    if (!userId) return; // userId가 없으면 실행하지 않음

    BlockInfo({ user_id: userId })
      .then((data) => {
        if (data?.start_time && data?.goal_time) {
          setBlockInfo({
            startTime: data.start_time,
            goalTime: data.goal_time,
          });
        }
      })
      .catch((error) => {
        console.error('Error fetching block info:', error);
      });
  }, [userId]); // userId가 변경될 때마다 실행

  return blockInfo;
};

export default useBlockInfo;

// 공통 유틸 함수: millisecond를 HH:MM 형식으로 변환
const formatMillisecondsToHHMM = (milliseconds: number): string => {
  const totalMinutes = Math.floor(milliseconds / (1000 * 60));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours.toString().padStart(2, '0')}H${minutes.toString().padStart(2, '0')}M`;
};

// 공통 유틸 함수: 현재 진행률 계산
const calculateProgress = (blockInfo: BlockInfoType) => {
  //const currentTimeUTC = new Date();
  const currentTimeKST = new Date();
  //   currentTimeUTC.getTime() + 9 * 60 * 60 * 1000,
  // ); // UTC + 9시간
  const startTime = new Date(blockInfo.startTime);
  const goalTime = new Date(blockInfo.goalTime);

  const totalDuration = goalTime.getTime() - startTime.getTime(); // 총 차단 시간 = > 목표시간임 이게
  const elapsedTime = currentTimeKST.getTime() - startTime.getTime(); // 경과 시간

  const percentage = Math.max(
    0,
    Math.min(100, (elapsedTime / totalDuration) * 100),
  );

  return { totalDuration, elapsedTime, percentage };
};

// ProgressBar 컴포넌트
export const ProgressBar = ({ userId }: { userId: number }) => {
  const [progress, setProgress] = useState(0);
  const blockInfo = useBlockInfo(userId); // userId를 전달하도록 수정
  
  useEffect(() => {
    if (!blockInfo) return;

    const interval = setInterval(() => {
      const { percentage } = calculateProgress(blockInfo);
      setProgress(percentage);
    }, 1000); // 1초마다 업데이트

    return () => clearInterval(interval);
  }, [blockInfo]);

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

// DurationElapsedPercentage 유틸 함수
export const DurationElapsedPercentage = (userId : number):
  | [string, string, string]
  | null => {
  const blockInfo = useBlockInfo(userId); // userId를 전달하도록 수정

  if (!blockInfo) return null;

  const { totalDuration, elapsedTime, percentage } =
    calculateProgress(blockInfo);
  return [
    formatMillisecondsToHHMM(totalDuration),
    formatMillisecondsToHHMM(elapsedTime),
    percentage.toFixed(2).toString(),
  ];
};
