import { create } from 'zustand';

type FullpageStore = {
  fullpageApi: any; // Fullpage.js API를 저장할 변수
  setFullpageApi: (api: any) => void; // API를 업데이트하는 함수
};

const useFullpageStore = create<FullpageStore>((set) => ({
  fullpageApi: null,
  setFullpageApi: (api) => set({ fullpageApi: api }), // Zustand 상태 업데이트
}));

export default useFullpageStore;