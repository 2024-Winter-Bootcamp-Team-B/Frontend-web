import { useEffect, useState } from 'react';
import { fetchMostBlocked } from '../api/mostBlocked';
import Navbar from '../components/Navbar';
import dayjs from 'dayjs';
import { BlockReq, blockSites } from '../api/block';
import TimePicker from 'react-time-picker';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration); // duration 플러그인 활성화

const BlockPage = () => {
  const [startTime, setStartTime] = useState<string>('00:00');
  const [goalTime, setGoalTime] = useState<string>('00:00');
  const [timeDiff, setTimeDiff] = useState<string>('');
  const today = dayjs().format('YYYY년 MM월 DD일'); // dayjs 라이브러리로 오늘 날짜 가져오기

  // 최고 빈도 사이트 5개 API
  useEffect(() => {
    fetchMostBlocked()
      .then((response) => {
        if (response) {
          console.log(response);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  // 차단 API
  // 시간 차이 계산
  const calcTimeDiff = () => {
    const todayDate = dayjs().format('YYYY-MM-DD');
    const start = dayjs(`${todayDate}T${startTime}`);
    const goal = dayjs(`${todayDate}T${goalTime}`);
    const diff = dayjs.duration(goal.diff(start));
    const hours = diff.hours();
    const minutes = diff.minutes();
    setTimeDiff(`${hours}H ${minutes}M`);
  };

  useEffect(() => {
    calcTimeDiff();
  }, [startTime, goalTime]);

  const handleBlock = () => {
    const todayDate = dayjs().format('YYYY-MM-DD');
    const block: BlockReq = {
      user_id: 1,
      start_time: dayjs(`${todayDate}T${startTime}`).toISOString(),
      goal_time: dayjs(`${todayDate}T${goalTime}`).toISOString(),
      sites: ['google.com', 'naver.com'],
    };

    blockSites(block)
      .then((response) => {
        if (response) {
          console.log(response);
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className='section h-full'>
      <Navbar></Navbar>
      <div className='flex flex-col items-start h-[calc(100%-2.75rem)] px-16 py-8 gap-6'>
        {/* 오늘 날짜 표시 */}
        <p className='text-xl'>{today}</p>
        <div className='font-abril text-8xl flex justify-between w-full'>
          <TimePicker
            onChange={(value) => setStartTime(value || '00:00')}
            value={startTime}
            disableClock={true}
            clearIcon={null}
            format='HH:mm'
          />
          <p>~</p>
          <TimePicker
            onChange={(value) => setGoalTime(value || '00:00')}
            value={goalTime}
            disableClock={true}
            clearIcon={null}
            format='HH:mm'
          />
          <p>{timeDiff}</p>
        </div>
        <p className='text-xl'>URL을 입력하세요</p>
        <input
          type='url'
          placeholder='URL 예시'
          className='rounded-[30px] w-[1000px] h-12 p-6 placeholder:text-center'
          style={{
            boxShadow:
              '-2px -2px 4px 0px rgba(239, 237, 225, 0.50) inset, 2px 2px 4px 0px rgba(170, 170, 204, 0.25) inset, 5px 5px 10px 0px rgba(170, 170, 204, 0.50) inset, -5px -5px 10px 0px #FFF inset',
          }}
        />
        <button
          className='bg-white rounded-3xl w-24 h-12 self-center mt-auto'
          onClick={handleBlock}
          style={{
            boxShadow:
              '0px 2px 8px 0px rgba(40, 41, 61, 0.08), 0px 20px 32px 0px rgba(96, 97, 112, 0.24)',
          }}
        >
          차단하기
        </button>
      </div>
    </div>
  );
};
export default BlockPage;
