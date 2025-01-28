import api from './api';

export interface BlockInfoReq {
  user_id: number;
}

export interface BlockInfoRes {
  start_time?: string; // ISO 형식 날짜 문자열
  goal_time?: string;   // ISO 형식 날짜 문자열
  message?: string;    // 오류 메시지
  detail?: string;     // 에러 디테일
}

export const BlockInfo = async (req: BlockInfoReq) => {
  const { user_id } = req;
  try {
    const response = await api.get<BlockInfoRes>(`/history/latest/${user_id}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};