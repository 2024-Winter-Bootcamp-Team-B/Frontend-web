import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  user_id: number | null;
  user_name: string | null;
  isLoggedIn: boolean; // 로그인 여부 확인
  login: (user_id: number, user_name: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user_id: null,
      user_name: null,
      isLoggedIn: false,
      login: (user_id, user_name) =>
        set({
          user_id,
          user_name,
          isLoggedIn: true,
        }),
    }),
    { name: 'authStorage' }, // 로컬 스토리지 키 이름
  ),
);

export default useAuthStore;
