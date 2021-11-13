<template>
  <div class="app">
    <GameWraper>
      <div class="iconsContainer">
        <HomeIcon
          v-for="d in district.allDistrist"
          :key="d.name"
          :target="'/' + d.name"
          :x="d.homeIconX"
          :y="d.homeIconY"
          :icon="d.homeIcon"
          @iconClick="iconClickHandler"
        ></HomeIcon>
      </div>

      <img class="bg" src="/images/home_bg.svg" />
    </GameWraper>
    <div class="ripple" ref="rippleEl"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import HomeIcon from "../components/HomeIcon.vue";
import { useDistrictStore } from "../store/district";
import { useAnimation } from "../store/animation";
import GameWraper from "../components/GameWraper.vue";
import anime from "animejs";

export default defineComponent({
  components: { HomeIcon, GameWraper },
  setup() {
    const rippleX = ref("100px");
    const rippleY = ref("100px");
    const rippleEl = ref<any>();
    const animation = useAnimation();
    const router = useRouter();
    const district = useDistrictStore();

    const idleAnimation = () => {
      anime({
        targets: ".iconContainer",
        translateY: [
          { value: -5, easing: "easeOutSine", duration: 30 },
          { value: 0, easing: "easeInOutQuad", duration: 500 },
        ],
        scale: [
          { value: 1.03, duration: 300 },
          { value: 1, duration: 800 },
        ],
        easing: "easeOutQuad",
        zIndex: [{ value: 2 }, { value: 2 }, { value: 1 }],
        loop: true,
        delay: anime.stagger(500),
      });
    };

    const iconClickHandler = (evt: any) => {
      console.log(evt);
      rippleX.value = evt.e.x - 30 + "px";
      rippleY.value = evt.e.y - 30 + "px";
      const targetSize = Math.sqrt(
        Math.pow(window.innerWidth, 2) + Math.pow(window.innerHeight, 2)
      );
      animation.toScale(rippleEl.value, (targetSize * 2) / 60, () => {
        router.push({ path: evt.target });
      });
    };

    return {
      district,
      iconClickHandler,
      rippleX,
      rippleY,
      rippleEl,
    };
  },
});
</script>

<style scoped>
.bg {
  z-index: -2;
  width: 100%;
  height: auto;
}
.ripple {
  width: 60px;
  height: 60px;
  position: absolute;
  top: v-bind(rippleY);
  left: v-bind(rippleX);
  background: #000;
  border-radius: 50%;
  opacity: 0;
  transform-origin: center center;
}

.iconsContainer {
  width: 100%;
  padding-top: 56%;
  position: relative;
}
</style>
