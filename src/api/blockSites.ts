import api from './api';

interface BlockRequest {
  start_time: string;
  goal_time: string;
  sites: string[];
}

export const blockSites = async (data: BlockRequest) => {
  try {
    const response = await api.post('/lock/block', data);
    const responseData = response.data;
    return responseData;
  } catch (error) {
    throw new Error('차단 요청 중 오류가 발생했습니다.');
  }
};
