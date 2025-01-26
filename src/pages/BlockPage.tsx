import { useEffect, useState } from 'react';
import { fetchMostBlocked } from '../api/mostBlocked';
import dayjs from 'dayjs';
import { BlockReq, blockSites } from '../api/block';
import TimePicker from 'react-time-picker';
import duration from 'dayjs/plugin/duration';
import useAuthStore from '../store/authStore';

dayjs.extend(duration); // 시간 차이 계산을 위한 duration 플러그인 활성화

const BlockPage = () => {
  const [startTime, setStartTime] = useState<string>('00:00');
  const [goalTime, setGoalTime] = useState<string>('00:00');
  const [timeDiff, setTimeDiff] = useState<string>('');
  const [urlInput, setUrlInput] = useState<string>('');
  const [urlList, setUrlList] = useState<string[]>([]);
  const [mostBlocked, setMostBlocked] = useState<string[]>([]);
  const today = dayjs().format('YYYY년 MM월 DD일'); // dayjs 라이브러리로 오늘 날짜 가져오기
  const { user_id } = useAuthStore();

  // 최고 빈도 사이트 5개 API
  useEffect(() => {
    fetchMostBlocked()
      .then((response) => {
        if (response?.result && Array.isArray(response.result)) {
          setMostBlocked(response.result);
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

  // startTimte 또는 goalTime이 변경될 때마다 시간 차이 계산
  useEffect(() => {
    calcTimeDiff();
  }, [startTime, goalTime]);

  const handleStartTimeChange = (value: string | null) => {
    setStartTime(value || '00:00');
  };

  const handleGoalTimeChange = (value: string | null) => {
    setGoalTime(value || '00:00');
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrlInput(e.target.value);
  };

  // URL 추가
  const handleAddUrl = () => {
    if (!urlInput) {
      return;
    }
    setUrlList((prevList) => [...prevList, urlInput]);
    setUrlInput('');
  };

  const handleBlock = () => {
    const todayDate = dayjs().format('YYYY-MM-DD');
    if (!user_id) {
      return;
    }
    const block: BlockReq = {
      user_id,
      start_time: dayjs(`${todayDate}T${startTime}`).toISOString(),
      goal_time: dayjs(`${todayDate}T${goalTime}`).toISOString(),
      sites: urlList,
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
      <div className='flex h-[calc(100%-2.75rem)] mt-11'>
        <div className='flex flex-col justify-center gap-12 bg-[#F2F6F5] p-4 self-center rounded-[30px]'>
          {mostBlocked.map((site, index) => (
            <img
              key={index}
              src={`https://www.google.com/s2/favicons?sz=32&domain_url=${site}`}
            />
          ))}
        </div>
        <div className='flex flex-col items-start h-full w-full px-16 py-8 gap-6'>
          {/* 오늘 날짜 표시 */}
          <p className='text-xl'>{today}</p>
          <div className='font-abril text-8xl flex justify-between items-center w-full'>
            <TimePicker
              onChange={handleStartTimeChange}
              value={startTime}
              disableClock={true}
              clearIcon={null}
              format='HH:mm'
              className='w-[300px]'
              hourPlaceholder='00'
              minutePlaceholder='00'
            />
            <p>~</p>
            <TimePicker
              onChange={handleGoalTimeChange}
              value={goalTime}
              disableClock={true}
              clearIcon={null}
              format='HH:mm'
              className='w-[300px]'
              hourPlaceholder='00'
              minutePlaceholder='00'
            />
            <p className='w-[500px]'>{timeDiff}</p>
          </div>
          <p className='text-xl'>URL을 입력하세요</p>
          <div className='flex gap-4'>
            <input
              type='url'
              value={urlInput}
              onChange={handleUrlChange}
              placeholder='URL 예시'
              className='rounded-[30px] w-[1000px] h-15 p-6 placeholder:text-center'
              style={{
                boxShadow:
                  '-2px -2px 4px 0px rgba(239, 237, 225, 0.50) inset, 2px 2px 4px 0px rgba(170, 170, 204, 0.25) inset, 5px 5px 10px 0px rgba(170, 170, 204, 0.50) inset, -5px -5px 10px 0px #FFF inset',
              }}
            />
            <button
              onClick={handleAddUrl}
              className='bg-white rounded-full text-xl px-12 py-4 hover:text-white group relative flex items-center overflow-hidden'
              style={{
                boxShadow:
                  '0px 2px 8px 0px rgba(40, 41, 61, 0.08), 0px 20px 32px 0px rgba(96, 97, 112, 0.24)',
              }}
            >
              <span className='absolute h-15 top-0 left-0 w-0 h-full transition-all bg-cyan-600 opacity-100 group-hover:w-full duration-400 ease'></span>
              <span className='relative'>추가</span>
            </button>
          </div>
          <div>
            <ul className='flex gap-4'>
              {urlList.map((url, index) => (
                <li key={index} className='flex items-center gap-4'>
                  <img
                    src={`https://www.google.com/s2/favicons?sz=32&domain_url=${url}`}
                  />
                  <p>{url}</p>
                </li>
              ))}
            </ul>
          </div>
          <button
            className='bg-white rounded-full self-center mt-auto text-xl px-12 py-4 hover:text-white group relative flex items-center overflow-hidden '
            onClick={handleBlock}
            style={{
              boxShadow:
                '0px 2px 8px 0px rgba(40, 41, 61, 0.08), 0px 20px 32px 0px rgba(96, 97, 112, 0.24)',
            }}
          >
            <span className='absolute h-15 top-0 left-0 w-0 h-full transition-all bg-cyan-600 opacity-100 group-hover:w-full duration-400 ease'></span>
            <span className='relative'>차단하기</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlockPage;
