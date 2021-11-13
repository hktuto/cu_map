<template>
  <div class="appContainer">
    <div class="gameContainer">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useAnimation } from "../store/animation";

export default defineComponent({
  props: {
    bgColor: {
      type: String,
      default: "#fff",
    },
  },
  setup() {
    const animation = useAnimation();
    const scale = computed(() => animation.screenScale);
    return {
      scale,
    };
  },
});
</script>

<style scoped>
.appContainer {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: v-bind(bgColor);
}
.gameContainer {
  min-width: 1920px;
  min-height: 1080px;
  position: relative;
  transform: scale(v-bind(scale));
  transform-origin: center center;
  perspective: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
