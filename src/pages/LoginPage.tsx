import React, { useState } from 'react';
import { LoginReq, fetchLogin } from '../api/login';
import useAuthStore from '../store/authStore';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const loginReq: LoginReq = { login_id: id, login_password: password };
    fetchLogin(loginReq)
      .then((response) => {
        if (response) {
          console.log(response);
          if (response.user_id && response.user_name) {
            login(response.user_id, response.user_name);
          }
        }
      })
      .catch((error) => console.error(error));
  };

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className='flex flex-col items-center w-full gap-[60px]'>
      <div className='mt-[100px]'>
        <p className='font-abril text-8xl'>Log_in</p>
      </div>
      <div className='flex flex-col items-center justify-center mt-[150px]'>
        <div className='flex flex-col justify-center items-center gap-[35px]'>
          <div className='relative'>
            <input
              className='bg-transparent py-1 text-white font-light text-2xl focus:outline-none peer'
              placeholder=''
              style={{ borderBottom: '2px solid white', width: '500px' }}
              id='id'
              value={id}
              onChange={handleIdChange}
            />
            <label
              htmlFor='id'
              className='absolute left-0 text-xs text-black -top-3 transition-all 
            peer-focus:text-xs peer-focus:text-black peer-focus:-top-3
            peer-placeholder-shown:text-2xl peer-placeholder-shown:font-light peer-placeholder-shown:text-white'
            >
              user id
            </label>
          </div>
          <div className='relative'>
            <input
              className='bg-transparent py-1 text-white font-light text-2xl focus:outline-none peer'
              id='password'
              type='password'
              value={password}
              onChange={handlePasswordChange}
              placeholder=''
              style={{ borderBottom: '2px solid white', width: '500px' }}
            />
            <label
              htmlFor='password'
              className='absolute left-0 text-xs text-black -top-3 transition-all 
              peer-focus:text-xs peer-focus:text-black peer-focus:-top-3
              peer-placeholder-shown:text-2xl peer-placeholder-shown:font-light peer-placeholder-shown:text-white'
            >
              password
            </label>
          </div>
          <button
            onClick={handleSubmit}
            className='bg-white rounded-full self-center mt-auto text-xl px-12 py-4 hover:text-white group relative flex items-center overflow-hidden '
            style={{
              boxShadow:
                '0px 2px 8px 0px rgba(40, 41, 61, 0.08), 0px 20px 32px 0px rgba(96, 97, 112, 0.24)',
            }}
          >
            <span className='absolute h-15 top-0 left-0 w-0 h-full transition-all bg-focus-color opacity-100 group-hover:w-full duration-400 ease'></span>
            <span className='relative font-bold'>Log in</span>
          </button>
        </div>
        <div className='mt-[20px]'>
          <button
            className=' hover:text-white cursor-pointer group relative flex items-center overflow-hidden over:underline'
            onClick={() => navigate('/signup')}
          >
            <span className='absolute left-0 bottom-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300'></span>
            <span className='relative'>or Sign Up</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
