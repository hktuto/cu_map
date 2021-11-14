import { acceptHMRUpdate, defineStore } from "pinia";
import { ref } from "vue-demi";

import districtJson from "../../public/data/distrists.json";

type Response = {
  distrists: Distrist[];
};

export type DistrictPin = {
  x: number;
  y: number;
  icon: string;
  detailImg: string;
};

export type Distrist = {
  name: string;
  bgColor: string;
  coverColor: string;
  mapIcon: string;
  mapPin: DistrictPin[];
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
    const { distrists } = districtJson;
    allDistrist.value = distrists;
  };

  return {
    getData,
    allDistrist,
    getCurrentDistrist,
  };
});
