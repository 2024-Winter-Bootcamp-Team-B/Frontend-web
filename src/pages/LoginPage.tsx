import React, { useState } from 'react';
import { LoginReq, fetchLogin } from '../api/login';
import useAuthStore from '../store/authStore';

const LoginPage = () => {
  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { login } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
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
    <div className='flex flex-col justify-start items-center w-full gap-[60px]'>
      <div style={{ marginTop: '100px' }}>
        <p className='font-abril text-8xl'>Log_in</p>
      </div>
      <div
        className='flex flex-col items-center justify-center'
        style={{ marginTop: '150px' }}
      >
        <div>
          <form
            className='flex flex-col justify-center items-center gap-[35px]'
            onSubmit={handleSubmit}
          >
            <label htmlFor='id' className='sr-only'>
              {' '}
              {/*라벨 삭제해도 되는지 모르겠어서 sr-only로 숨김*/} user id{' '}
            </label>
            <input
              className='bg-transparent placeholder-white placeholder:text-2xl placeholder:font-light focus:outline-none'
              placeholder='user id'
              style={{ borderBottom: '2px solid white', width: '500px' }}
              id='id'
              value={id}
              onChange={handleIdChange}
            />
            <label htmlFor='password' className='sr-only'>
              {' '}
              password{' '}
            </label>
            <input
              className='bg-transparent placeholder-white placeholder:text-2xl placeholder:font-light focus:outline-none'
              id='password'
              type='password'
              value={password}
              onChange={handlePasswordChange}
              placeholder='password'
              style={{ borderBottom: '2px solid white', width: '500px' }}
            />
            <button
              className='bg-white rounded-3xl w-[400px] h-12 self-center mt-auto'
              style={{
                boxShadow:
                  '0px 2px 8px 0px rgba(40, 41, 61, 0.08), 0px 20px 32px 0px rgba(96, 97, 112, 0.24)',
              }}
            >
              {' '}
              <p className='font-bold text-2xl'>Log in</p>{' '}
            </button>
          </form>
        </div>
        <div style={{ marginTop: '20px' }}>
          <button>or Sign up</button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
