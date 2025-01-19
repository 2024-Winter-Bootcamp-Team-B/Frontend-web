import { create } from 'zustand';

interface Store {}

const useStore = create<Store>((set) => ({}));

export default useStore;
