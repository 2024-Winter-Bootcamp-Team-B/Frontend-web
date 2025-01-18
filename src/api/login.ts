import api from './api';

export interface LoginReq {
  login_id: string;
  login_password: string;
}

export interface LoginRes {
  message: string;
  user_id?: string;
  user_login_id?: string;
  user_name?: string;
  user_email?: string;
}

export const fetchLogin = async (req: LoginReq) => {
  const { login_id, login_password } = req;
  try {
    const response = await api.post<LoginRes>(
      '/user/login-g',
      {
        login_id,
        login_password,
      },
      { withCredentials: true },
    );
    return response.data;
  } catch (error) {
    Promise.reject(error);
  }
};
