import { acceptHMRUpdate, defineStore } from "pinia";

export const useAppStore = defineStore("app", () => {
  const sleep = (ms: number) => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  };
  return {
    sleep,
  };
});
