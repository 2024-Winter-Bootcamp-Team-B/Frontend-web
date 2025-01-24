import api from './api';

export interface TaskIdReq {
  task_id: string;
}

export interface TaskIdRes {
  task_id?: string;
  status?: string;
  result?: Result;
  detail?: string;
}

interface Result {
  match: boolean;
  message: string;
}

export const fetchTaskId = async (req: TaskIdReq) => {
  const { task_id } = req;
  try {
    const response = await api.get<TaskIdRes>(`/task/${task_id}/status`);
    return response.data;
  } catch (error) {
    Promise.reject(error);
  }
};
