<template>
  <div class="gameContainer">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useAnimation } from "../store/animation";

export default defineComponent({
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
.gameContainer {
  position: absolute;
  top: 0;
  left: 0;
  width: 1920px;
  height: 1080px;
  position: relative;
  transform: scale(v-bind(scale));
  transform-origin: top left;
  perspective: 100px;
}
</style>
