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
        <button>로그인</button>
      </form>
    </div>
  );
};

export default LoginPage;
