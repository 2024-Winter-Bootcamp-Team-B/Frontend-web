import api from './api';

export interface StatReq {
  user_id: number;
}

export interface StatRes {
  message: string;
  user_id?: number;
  start_time?: string;
  end_time?: string;
  goal_time?: string;
}

export const fetchStat = async (req: StatReq) => {
  const { user_id } = req;
  try {
    const response = await api.get<StatRes>(`/statistic/${user_id}`);
    return response.data;
  } catch (error) {
    Promise.reject(error);
  }
};
