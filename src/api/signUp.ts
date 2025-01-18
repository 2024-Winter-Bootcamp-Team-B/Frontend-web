import api from './api';

export interface SignUpReq {
  login_id: string;
  login_password: string;
  name: string;
  email: string;
}

export interface SignUpRes {
  message: string;
}

export const fetchSignUp = async (req: SignUpReq) => {
  const { login_id, login_password, name, email } = req;
  try {
    const response = await api.post<SignUpRes>('/user/sign-up', {
      login_id,
      login_password,
      name,
      email,
    });
    return response.data;
  } catch (error) {
    Promise.reject(error);
  }
};
