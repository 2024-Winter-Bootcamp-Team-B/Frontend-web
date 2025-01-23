import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authFail from '../assets/authFail.svg';
import './AuthFailPage.css';

const AuthFailPage = () => {
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // 컴포넌트가 마운트되면 애니메이션 시작
    setAnimate(true);
  }, []);

  return (
    <div className='w-full flex flex-col items-center justify-between py-8'>
       {/* 감옥 애니메이션 */}
      <div
        className={`${
          animate ? 'jail-animation' : ''
        } w-full h-4/5 flex justify-center`}
      >
        <img src={authFail} alt="감옥" className='h-4/5 w-full' />
      </div>
      {/* 텍스트 */} 
      <p className='font-abril text-5xl'>Try Again</p>

      {/* 재인증 버튼 */}
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
