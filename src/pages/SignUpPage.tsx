import React, { useState } from 'react';
import { fetchSignUp, SignUpReq } from '../api/signUp';

const SignUpPage = () => {
  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor='id'>아이디</label>
        <input id='id' value={id} onChange={handleIdChange} />
        <label htmlFor='password'>비밀번호</label>
        <input
          id='password'
          type='password'
          value={password}
          onChange={handlePasswordChange}
        />
        <label htmlFor='name'>이름</label>
        <input id='name' value={name} onChange={handleNameChange} />
        <label htmlFor='id'>이메일</label>
        <input id='email' value={email} onChange={handleEmailChange} />
        <button>회원가입</button>
      </form>
    </div>
  );
};

export default SignUpPage;
