import { create } from 'zustand';

interface BlockState {
  blockedSites: string[];
  setBlockedSites: (sites: string[]) => void;
}

const useBlockStore = create<BlockState>((set) => ({
  blockedSites: [],
  setBlockedSites: (sites) => set({ blockedSites: sites }),
}));

export default useBlockStore;
