import { acceptHMRUpdate, defineStore } from "pinia";
import anime from "animejs";
import { ref } from "vue-demi";
export const useAnimation = defineStore("animation", () => {
  const screenScale = ref(1);

  const setScale = () => {
    // compare ratio to 1920 / 1080, return scale relate to screen
    const relatedScale =
      window.innerWidth / window.innerHeight >= 1920 / 1080
        ? window.innerHeight / 1080
        : window.innerWidth / 1920;

    console.log(relatedScale);
    screenScale.value = relatedScale;
  };

  const dropIn = (
    mainEl: HTMLElement | string,
    shadowEl: HTMLElement | string,
    duration: number = 800,
    delay: number = 0,
    callback: any = () => {}
  ): anime.AnimeTimelineInstance => {
    const dropInAnimtion = anime.timeline({
      duration,
      delay,
    });
    dropInAnimtion
      .add({
        targets: mainEl,
        opacity: [0, 1],
        translateY: [-100, 0],
        complete: callback,
      })
      .add(
        {
          targets: shadowEl,
          opacity: [0, 1],
          rotateX: ["70deg", "70deg"],
          scale: [2, 1],
        },
        0
      );

    return dropInAnimtion;
  };

  const dropOut = (
    mainEl: HTMLElement | string,
    shadowEl: HTMLElement | string,
    duration: number = 800,
    delay: number = 0,
    callback: any = () => {}
  ) => {
    anime({
      targets: mainEl,
      opacity: [0, 1],
      translateY: [-100, 0],
      duration,
      delay,
      complete: callback,
    });
    anime({
      targets: shadowEl,
      opacity: [0, 1],
      rotateX: ["70deg", "70deg"],
      scale: [2, 1],
      duration,
      delay,
    });
  };

  const floating = (
    mainEl: HTMLElement | string,
    shadowEl: HTMLElement | string,
    range: number[] = [0, -10],
    delayMax: number = 10000
  ) => {
    const delay = Math.random() * (delayMax - 0);
    anime({
      targets: mainEl,
      translateY: range,
      // scale: [1, 1.1],
      loop: true,
      duration: 2000,
      direction: "alternate",
      easing: "easeInOutSine",
      delay,
    });

    anime({
      targets: shadowEl,
      scale: [1, 1.5],
      rotateX: ["70deg", "70deg"],
      direction: "alternate",
      easing: "easeInOutSine",
      delay,
    });
  };

  const toScale = (
    el: HTMLElement,
    scale: number,
    callback: any = () => {}
  ): anime.AnimeInstance => {
    return anime({
      targets: el,
      scale: [1, scale],
      opacity: [{ value: 1, duration: 100 }],
      duration: 500,
      easing: "easeInOutSine",
      complete: callback,
    });
  };

  return {
    setScale,
    screenScale,
    dropIn,
    floating,
    toScale,
  };
});
