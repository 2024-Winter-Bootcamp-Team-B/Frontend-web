import prisoner from '../assets/image707.svg';
import prison from '../assets/Union.png';

const AuthFailPage = () => {
  return (
    <div className='flex flex-col relative h-full w-full justify-center items-center gap-8'>
      <div className='flex flex-col items-center w-full h-3/5 relative bottom-[90px]'>
        <div className=' relative w-full h-full z-10'>
          <img className='w-full h-full z-10' src={prison}></img>
        </div>
        <div className=' h-[1200px] w-[1521px] z-0 relative bottom-[1300px]'>
          <img className='w-full h-full' src={prisoner}></img>
        </div>
      </div>
      <div className=' relative font-abril text-[300px]'>Try Again</div>
      <div className='relative'>
        <button
          className='bg-white rounded-3xl w-[500px] h-[250px] self-center mt-auto'
          style={{
            boxShadow:
              '0px 2px 8px 0px rgba(40, 41, 61, 0.08), 0px 20px 32px 0px rgba(96, 97, 112, 0.24)',
          }}
        >
          <p className='font-paperlogy text-[100px]'>재인증</p>
        </button>
      </div>
    </div>
  );
};

export default AuthFailPage;
