import api from './api';

export interface StatReq {
  user_id: number;
}

export interface StatRes {
  message: string;
  result?: Result[];
}

interface Result {
  date: string;
  goal: string;
  actual: string;
  goal_min: string;
  actual_min: string;
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
