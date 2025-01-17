import { useState } from 'react';
import { LoginReq, fetchLogin } from '../api/login';

const LoginPage = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const login: LoginReq = { login_id: id, login_password: password };
    try {
      const response = await fetchLogin(login);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor='id'>아이디</label>
        <input id='id' value={id} onChange={(e) => setId(e.target.value)} />
        <label htmlFor='password'>비밀번호</label>
        <input
          id='password'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>로그인</button>
      </form>
    </div>
  );
};

export default LoginPage;
