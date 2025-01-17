import api from './api';

export interface SignUpReq {
  login_id: string;
  password: string;
  name: string;
  email: string;
}

export interface SignUpRes {
  message: string;
}

export const signUp = async (req: SignUpReq) => {
  const { login_id, password, name, email } = req;
  try {
    const response = await api.post<SignUpRes>(`/signup`, {
      login_id,
      password,
      name,
      email,
    });
    return response.data;
  } catch (error) {
    console.error();
  }
};
