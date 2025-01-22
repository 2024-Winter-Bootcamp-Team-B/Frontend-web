import { useNavigate } from 'react-router-dom';
import authFail from '../assets/authFail.svg';

const AuthFailPage = () => {
  const navigate = useNavigate();

  return (
    <div className='w-full flex flex-col items-center justify-between py-8'>
      <img src={authFail} className='h-4/5 w-full' />
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
