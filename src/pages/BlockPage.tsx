import Navbar from '../components/Navbar';
import dayjs from 'dayjs';

const BlockPage = () => {
  const today = dayjs().format('YYYY년 MM월 DD일'); // dayjs 라이브러리로 오늘 날짜 가져오기
  return (
    <div className='section h-full'>
      <Navbar></Navbar>
      <div className='flex flex-col items-start h-[calc(100%-2.75rem)] px-16 py-8 gap-6'>
        <p className='text-xl'>{today}</p>
        <div className='font-abril text-8xl flex justify-between w-full'>
          <p>01:30</p>
          <p>~</p>
          <p>21:00</p>
          <p>19H 30M</p>
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
        ></input>
        <button
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
