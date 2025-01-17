import api from './api';

export interface LoginReq {
  login_id: string;
  login_password: string;
}

export interface LoginRes {
  message: string;
  user_id?: string;
  user_login_id?: string;
  user_login_password?: string;
  user_name?: string;
  user_email?: string;
}

export const fetchLogin = async (req: LoginReq) => {
  try {
    const { login_id, login_password } = req;
    const response = await api.post<LoginRes>(`/user/login-g`, {
      login_id,
      login_password,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
