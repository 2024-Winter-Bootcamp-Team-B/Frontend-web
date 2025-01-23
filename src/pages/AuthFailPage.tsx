import { useNavigate } from 'react-router-dom';
import jail from '../assets/authFailJail.svg';
import person from '../assets/person.svg';
import { motion } from 'motion/react';

const AuthFailPage = () => {
  const navigate = useNavigate();

  // 애니메이션 variants 설정
  const variants = {
    hidden: {
      y: '-100%',
    },
    visible: {
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <div className='w-full flex flex-col items-center justify-between pb-8'>
      <div className='w-full h-4/5 flex justify-center relative'>
        <motion.img
          src={jail}
          className='h-full absolute z-10'
          variants={variants}
          initial='hidden'
          animate='visible'
        />
        <img src={person} className='h-3/5 absolute bottom-5' />
      </div>
      <p className='font-abril text-5xl'>Try Again</p>
      <button
        onClick={() => navigate('/photo')}
        className='bg-white rounded-3xl w-24 h-12'
        style={{
          boxShadow:
            '0px 2px 8px 0px rgba(40, 41, 61, 0.08), 0px 20px 32px 0px rgba(96, 97, 112, 0.24)',
        }}
      >
        재인증
      </button>
    </div>
  );
};

export default AuthFailPage;
