import api from './api';

export interface SitesRes {
  sites?: string[]; // 사이트 목록
  detail?: string;  // 오류 메시지
}

export const getAllSites = async (): Promise<string[]> => {
  try {
    const response = await api.get<string[]>('lock/sites');
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};