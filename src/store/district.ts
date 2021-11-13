import { acceptHMRUpdate, defineStore } from "pinia";
import { ref } from "vue-demi";

import axios from "axios";

type Response = {
  distrists: Distrist[];
};

export type Distrist = {
  name: string;
  bgColor: string;
  coverColor: string;
  homeIcon: string;
  homeIconX: number;
  homeIconY: number;
};

export const useDistrictStore = defineStore("distrist", () => {
  const allDistrist = ref<Distrist[]>([]);

  const getCurrentDistrist = (name: String) => {
    return allDistrist.value.find((d) => d.name === name);
  };

  const getData = async () => {
    const {
      data: { distrists },
    } = await axios.get<Response>("/data/distrists.json");
    allDistrist.value = distrists;
  };

  return {
    getData,
    allDistrist,
    getCurrentDistrist,
  };
});
