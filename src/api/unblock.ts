import api from './api';

export interface UnblockReq {
  user_id: number;
  result: number;
}

export interface UnblockRes {
  message?: string;
  user_id?: number;
  detail?: string;
  error?: string;
}

export const unblockSites = async (req: UnblockReq) => {
  const { user_id, result } = req;
  try {
    const response = await api.post<UnblockRes>(`/lock/unblock/${user_id}`, {
      user_id,
      result,
    });
    return response.data;
  } catch (error) {
    Promise.reject(error);
  }
};
