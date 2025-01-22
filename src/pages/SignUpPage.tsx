import React, { useState } from 'react';
import { fetchSignUp, SignUpReq } from '../api/signUp';

const SignUpPage = () => {
  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [repassword, setRepassword] = useState<string>(''); //비밀번호 검사
  const [errorMessage, setErrorMessage] = useState(''); //에러메세지
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== repassword) {
      //비밀번호검사 이거 추가함
      alert('Passwords do not match.');
    }

    const signUp: SignUpReq = {
      login_id: id,
      login_password: password,
      name,
      email,
    };
    fetchSignUp(signUp)
      .then((response) => {
        if (response) {
          console.log(response);
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

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleRepasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //비밀번호 검사 기능 추가
    setRepassword(e.target.value);

    // 실시간으로 확인
    if (e.target.value !== password) {
      setErrorMessage('Passwords do not match');
    } else {
      setErrorMessage('');
    }
  };

  return (
    <div className='flex flex-col w-full justify-start items-center gap-[100px]'>
      <div style={{ marginTop: '100px' }}>
        <p className='font-abril text-8xl'>Sign_up</p>
      </div>
      <div>
        <form
          className='flex flex-col justify-center items-center gap-[35px]'
          onSubmit={handleSubmit}
        >
          <div className='relative'>
            <input
              className='bg-transparent py-1 text-white font-light text-2xl focus:outline-none peer'
              placeholder=''
              style={{ borderBottom: '2px solid white', width: '500px' }}
              id='name'
              value={name}
              onChange={handleNameChange}
            />
            <label
              htmlFor='name'
              className='absolute left-0 text-xs text-black -top-3 transition-all 
              peer-focus:text-xs peer-focus:text-black peer-focus:-top-3
              peer-placeholder-shown:text-2xl peer-placeholder-shown:font-light peer-placeholder-shown:text-white'
            >
              name
            </label>
          </div>
          <div className='relative'>
            <input
              className='bg-transparent text-white font-light text-2xl focus:outline-none peer'
              placeholder=''
              style={{ borderBottom: '2px solid white', width: '500px' }}
              id='email'
              value={email}
              onChange={handleEmailChange}
            />
            <label
              htmlFor='id'
              className='absolute left-0 text-xs text-black -top-3 transition-all
              peer-focus:text-xs peer-focus:text-black peer-focus:-top-3
              peer-placeholder-shown:text-2xl peer-placeholder-shown:font-light peer-placeholder-shown:text-white'
            >
              email
            </label>
          </div>
          <div className='relative'>
            <input
              className='bg-transparent text-white font-light text-2xl focus:outline-none peer'
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
              className='bg-transparent text-white font-light text-2xl focus:outline-none peer'
              placeholder=''
              style={{ borderBottom: '2px solid white', width: '500px' }}
              id='password'
              type='password'
              value={password}
              onChange={handlePasswordChange}
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
          <div className='relative'>
            <input
              className='bg-transparent text-white font-light text-2xl focus:outline-none peer'
              placeholder=''
              style={{ borderBottom: '2px solid white', width: '500px' }}
              id='repassword'
              type='password'
              value={repassword}
              onChange={handleRepasswordChange}
            />
            <label
              htmlFor='password'
              className='absolute left-0 text-xs text-black -top-3 transition-all
              peer-focus:text-xs peer-focus:text-black peer-focus:-top-3
              peer-placeholder-shown:text-2xl peer-placeholder-shown:font-light peer-placeholder-shown:text-white'
            >
              re-enter your password
            </label>
          </div>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          <button
            className='bg-white font-bold rounded-3xl w-[400px] h-12 self-center mt-auto'
            style={{
              boxShadow:
                '0px 2px 8px 0px rgba(40, 41, 61, 0.08), 0px 20px 32px 0px rgba(96, 97, 112, 0.24)',
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
