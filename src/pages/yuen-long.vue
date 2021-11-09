<template>
  <div class="distristContainer">
    <!-- <router-link to="/"> back </router-link> -->

    <DistristBg class="bg" />
    <div class="detailContainer">
      <div class="detailBg">
        <BgSvg />
        <div :class="{ popUpContainer: true, popUpOpened }">
          <img :src="detailImg" @click="popUpOpened = false" />
        </div>
        <div class="navRow">
          <homeBtn @click="$router.push({ path: '/' })" />
          <backBtn
            @click="popUpOpened ? (popUpOpened = false) : $router.back()"
          />
        </div>
        <DistrictIcon class="districtIcon"></DistrictIcon>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from "vue";
import DistristBg from "../assets/distrist_bg.svg?component";

import anime from "animejs";

import BgSvg from "../assets/yuen-long_bg.svg?component";
import DistrictIcon from "../assets/yuen-long_icon.svg?component";
import homeBtn from "../assets/homeButton.svg?component";
import backBtn from "../assets/backButton.svg?component";

export default defineComponent({
  components: { DistristBg, BgSvg, homeBtn, backBtn, DistrictIcon },
  setup() {
    const bgColor = ref("#116A80");
    const coverColor = ref("rgb(21,51,77)");
    const popUpOpened = ref(false);
    const els = ref<NodeListOf<Element>>();
    const detailImg = ref("");

    const itemClick = (e: any) => {
      const parent = e.target.closest(".detailBtn");
      detailImg.value = parent.getAttribute("data-img");
      popUpOpened.value = true;
    };

    const startAnimate = () => {
      anime({
        targets: ".detailBtn",
        translateY: [
          { value: -5, easing: "easeOutSine", duration: 500 },
          { value: 0, easing: "easeInOutQuad", duration: 1200 },
        ],
        easing: "easeOutQuad",
        zIndex: [{ value: 2 }, { value: 2 }, { value: 1 }],
        loop: true,
        delay: anime.stagger(500),
      });
    };

    onMounted(() => {
      els.value = document.querySelectorAll(".detailBtn");
      els.value.forEach((el: any) => el.addEventListener("click", itemClick));
      startAnimate();
    });

    onUnmounted(() => {
      (<any>els.value).forEach((el: any) =>
        el.removeEventListener("click", itemClick)
      );
    });
    return {
      els,
      bgColor,
      coverColor,
      BgSvg,
      popUpOpened,
      detailImg,
    };
  },
});
</script>

<style>
.bg {
  z-index: 0;
}
.distristBgColor {
  fill: v-bind(bgColor);
}
.detailContainer {
  width: 100vw;
  height: 100vh;
  padding: 98px;
  background: v-bind(bgColor);
  display: flex;
  justify-content: center;
  align-content: center;
}
.detailBg {
  width: 1720px;
  height: 880px;
  background: v-bind(coverColor);
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.5);
  position: relative;
}
.navRow {
  position: absolute;
  left: 30px;
  bottom: 20px;
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(2, 1fr);
}
.navRow > * {
  width: 66px;
}
.popUpContainer {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  display: none;
  background: rgba(0, 0, 0, 0.9);
  transition: opacity 0.5s ease-in-out;
}
.popUpContainer.popUpOpened {
  opacity: 1;
  display: block;
}
.detailBtn {
  cursor: pointer;
}
.districtIcon {
  position: absolute;
  left: 0px;
  bottom: 60px;
}
</style>
