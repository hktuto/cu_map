<template>
  <div class="app">
    <GameWraper>
      <div class="iconsContainer">
        <HomeIcon
          v-for="item in district.allDistrist"
          :item="item"
          @iconClick="iconClickHandler"
        ></HomeIcon>
      </div>

      <img class="bg" src="/images/home_bg.svg" />
      <HomeInfo />
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
import HomeInfo from "../components/HomeInfo.vue";

export default defineComponent({
  components: { HomeIcon, GameWraper, HomeInfo },
  setup() {
    const rippleX = ref("0px");
    const rippleY = ref("0px");
    const rippleEl = ref<any>();
    const rippleColor = ref<string>("#000");
    const animation = useAnimation();
    const router = useRouter();
    const district = useDistrictStore();

    const iconClickHandler = (evt: any) => {
      // console.log(evt);
      rippleColor.value = evt.item.bgColor;
      // const targetSize = Math.sqrt(
      //   Math.pow(window.innerWidth, 2) + Math.pow(window.innerHeight, 2)
      // );
      animation.fadeIn(rippleEl.value, () => {
        router.push({ path: "/district/" + evt.item.name });
      });
    };

    return {
      district,
      iconClickHandler,
      rippleX,
      rippleY,
      rippleEl,
      rippleColor,
    };
  },
});
</script>

<style lang="scss" scoped>
.bg {
  z-index: -2;
  width: 100%;
  height: auto;
}
.ripple {
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: v-bind(rippleY);
  left: v-bind(rippleX);
  background: v-bind(rippleColor);
  opacity: 0;
  transform-origin: center center;
  pointer-events: none;
}

.iconsContainer {
  width: 100%;
  padding-top: 56%;
  position: relative;
}
</style>
