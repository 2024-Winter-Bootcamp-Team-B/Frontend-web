import api from './api';

export interface LoginReq {}

export interface LoginRes {}

export const postSignIn = async (req: LoginReq) => {
  try {
    const response = await api.get<LoginRes>(`/auth/login`, {});
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
