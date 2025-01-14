import Logo from '../components/Logo';
import jail from '../assets/jail.svg';
import meme from '../assets/memeEx.svg';

const MemePage = () => {
  return (
    <div className='w-full flex flex-col items-center px-16 py-8'>
      <Logo />
      <div className='flex gap-8'>
        <div className='flex flex-col grow w-full justify-between'>
          <div className='text-white flex gap-4'>
            <p className='font-cinzel font-bold text-2xl'>FOCUS</p>
            <div className='bg-white w-full h-px self-center' />
          </div>
          <div className='font-semibold text-4xl'>
            <p>전체 목표의 62.5%를 달성했습니다</p>
            <p>목표시간 4H 달성시간 2H 30M</p>
          </div>
          <div className='bg-white h-12 rounded-3xl' />
          <img src={jail} />
        </div>
        <div className='grow w-full'>
          <img src={meme} />
        </div>
      </div>
    </div>
  );
};

export default MemePage;
