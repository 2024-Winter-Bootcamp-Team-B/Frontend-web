import api from './api';

export interface LoginReq {
  login_id: string;
  login_password: string;
}

export interface LoginRes {
  message: string;
  user_id?: number;
  user_name?: string;
}

export const fetchLogin = async (req: LoginReq) => {
  const { login_id, login_password } = req;
  try {
    const response = await api.post<LoginRes>('/user/login-g', {
      login_id,
      login_password,
    });
    return response.data;
  } catch (error) {
    Promise.reject(error);
  }
};
