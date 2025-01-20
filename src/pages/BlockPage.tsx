import { useEffect, useState } from 'react';
import { fetchMostBlocked } from '../api/mostBlocked';
import Navbar from '../components/Navbar';
import dayjs from 'dayjs';
import { blockSites } from '../api/blockSites';
import duration from 'dayjs/plugin/duration'; // duration 플러그인 가져오기

dayjs.extend(duration); // 플러그인 활성화

const BlockPage = () => {
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

  // 현재 시간과 초기값 설정
  const now = dayjs();
  const initialStartTime = now.format('HH:mm'); // 현재 시각
  const initialGoalTime = now.add(1, 'hour').format('HH:mm'); // 1시간 후
  const initialTimeDifference = `1H 0M`;

  // 상태 관리
  const [startTime, setStartTime] = useState(initialStartTime);
  const [goalTime, setGoalTime] = useState(initialGoalTime);
  const [timeDifference, setTimeDifference] = useState(initialTimeDifference);
  const [urlInput, setUrlInput] = useState('');
  const [sites, setSites] = useState<string[]>([]);

  // 시간 차이 계산 함수
  const calculateTimeDifference = (start: string, end: string) => {
    const startMoment = dayjs(`2025-01-01 ${start}`, 'YYYY-MM-DD HH:mm');
    const endMoment = dayjs(`2025-01-01 ${end}`, 'YYYY-MM-DD HH:mm');
    if (endMoment.isBefore(startMoment)) return '시간 입력이 잘못되엇습니다.'; // 자정을 넘기지 않도록 제한
    const duration = dayjs.duration(endMoment.diff(startMoment));
    const hours = duration.hours();
    const minutes = duration.minutes();
    console.log('timeDifference:', `${hours}H ${minutes}M`);
    return `${hours}H ${minutes}M`;
  };

  // 시간 제한 함수
  const validateTime = (time: string) => {
    const maxTime = dayjs('23:59', 'HH:mm');
    const inputTime = dayjs(time, 'HH:mm');
    if (inputTime.isAfter(maxTime)) return '23:59'; // 자정을 넘는 경우 제한
    return time;
  };

  // URL 추가 함수
  const handleAddUrl = () => {
    if (urlInput.trim() !== '') {
      setSites([...sites, urlInput]);
      setUrlInput('');
    }
  };

  // URL 삭제 함수
  const handleDeleteUrl = (index: number) => {
    setSites(sites.filter((_, i) => i !== index));
  };

  // 차단하기 버튼 클릭 함수
  const handleBlock = async () => {
    const blockData = {
      start_time: startTime,
      goal_time: goalTime,
      sites: sites,
    };

    console.log(typeof startTime, typeof goalTime, typeof sites);

    try {
      const response = await blockSites(blockData);
      console.log('차단 성공:', response);

      // 초기화
      setStartTime(initialStartTime);
      setGoalTime(initialGoalTime);
      setSites([]);
      setTimeDifference('initialTimeDifference');
    } catch (error) {
      console.error('오류 발생:', error);
    }
  };

  // export const blockSites = async (data: BlockRequest) => {
  //   try {
  //     const response = await api.post('/lock/block', data);
  //     const responseData = response.data;
  //     return responseData;
  //   } catch (error) {
  //     throw new Error('차단 요청 중 오류가 발생했습니다.');
  //   }
  // };

  // 시간 입력 핸들러
  const handleStartTimeChange = (time: string) => {
    const validatedTime = validateTime(time);
    setStartTime(validatedTime);
    setTimeDifference(calculateTimeDifference(validatedTime, goalTime));
    console.log('시작시간과 총 시간', validatedTime);
  };

  const handleGoalTimeChange = (time: string) => {
    const validatedTime = validateTime(time);
    setGoalTime(validatedTime);
    setTimeDifference(calculateTimeDifference(startTime, validatedTime));
    console.log('끝나는시간과 총 시간', validatedTime);
  };

  const handleUrlKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      console.log('enterKey pressed');
      handleAddUrl();
      console.log(sites);
    }
  };

  return (
    <div className='section h-full'>
      <Navbar></Navbar>
      <div className='flex flex-col items-start h-[calc(100%-2.75rem)] px-16 py-8 gap-6'>
        {/*오늘 날짜 표시*/}
        <p className='text-xl'>{today}</p>
        {/*시간 입력*/}
        <div className='font-abril text-8xl flex justify-between w-full'>
          <input
            type='time'
            value={startTime}
            onChange={(e) => handleStartTimeChange(e.target.value)}
            className='text-center'
            style={{ width: '500px', fontSize: '2rem', background: 'none' }}
          />
          <p>~</p>
          <input
            type='time'
            value={goalTime}
            onChange={(e) => handleGoalTimeChange(e.target.value)}
            className='text-center'
            style={{ width: '500px', fontSize: '2rem', background: 'none' }}
          />
          <p>{timeDifference}</p>
        </div>
        {/*url입력*/}
        <p className='text-xl'>URL을 입력하세요</p>
        <div className='flex items-center gap-4'>
          <input
            type='url'
            placeholder='URL 예시'
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onKeyDown={handleUrlKeyDown}
            className='rounded-[30px] w-[1000px] h-12 p-6 placeholder:text-center'
            style={{
              boxShadow:
                '-2px -2px 4px 0px rgba(239, 237, 225, 0.50) inset, 2px 2px 4px 0px rgba(170, 170, 204, 0.25) inset, 5px 5px 10px 0px rgba(170, 170, 204, 0.50) inset, -5px -5px 10px 0px #FFF inset',
            }}
          ></input>
        </div>
        {/* URL 리스트 표시 */}
        <ul className='list-disc pl-6'>
          {sites.map((site, index) => (
            <li
              key={index}
              className='text-lg relative group'
              style={{ padding: '8px 0' }}
            >
              {site}
              {/* 삭제 버튼 */}
              <button
                onClick={() => handleDeleteUrl(index)}
                className='absolute right-0 text-sm text-red-500 hidden group-hover:block'
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
        {/*차단하기*/}
        <button
          onClick={handleBlock}
          className='bg-white rounded-3xl w-24 h-12 self-center mt-auto'
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
