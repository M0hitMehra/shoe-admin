import create from "zustand";
import axios from "axios";
import { server } from "@/lib/utils";

const useUserStore = create((set) => ({
  user: null,
  loading: false,
  userFetched: false,
  error: null,
  fetchUser: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`${server}/auth/user`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      set({ user: res?.data?.user, loading: false, userFetched: true });
    } catch (error) {
      set({
        error: error?.response?.data?.message,
        loading: false,
        userFetched: true,
      });
    }
  },
  clearUser: () => set({ user: null,userFetched: false }),
}));

export default useUserStore;
