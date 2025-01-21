import api from './api';

export interface UnblockReq {
  result: number;
}

export interface UnblockRes {
  message?: string;
  user_id?: number;
  detail?: string;
  error?: string;
}

export const unblockSites = async (req: UnblockReq) => {
  const { result } = req;
  const user_id = result;
  try {
    const response = await api.post<UnblockRes>(`/lock/unblock/${user_id}`, {
      result,
    });
    return response.data;
  } catch (error) {
    Promise.reject(error);
  }
};
