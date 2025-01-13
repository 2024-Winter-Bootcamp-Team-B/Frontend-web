import Navbar from '../components/Navbar';

const BlockPage = () => {
  return (
    <div className='section h-full'>
      <Navbar></Navbar>
      <div className='flex flex-col justify-center items-start h-[calc(100%-2.75rem)] mx-16'>
        <p className='text-xl'>2025년 01월 13일</p>
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
          className='rounded-[30px] w-[1000px] h-12 p-6'
        ></input>
        <button className='bg-white'>차단하기</button>
      </div>
    </div>
  );
};

export default BlockPage;
