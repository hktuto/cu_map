<template>
  <div class="iconContainer" @click="clickHandler">
    <img :src="icon" ref="self" />
    <div class="shadow" ref="shadow"></div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import { useAnimation } from "../store/animation";

export default defineComponent({
  props: {
    x: {
      type: Number,
      default: 0,
    },
    y: {
      type: Number,
      default: 0,
    },
    icon: {
      type: String,
      default: "",
    },
    target: {
      type: String,
      default: "",
    },
  },
  emits: ["iconClick"],
  setup(props, { emit }) {
    const self = ref<any>();
    const shadow = ref<any>();
    const animation = useAnimation();

    const idleAnimation = ref<anime.AnimeInstance>();

    const iconScale = computed(() => animation.screenScale);

    const xPixel = computed(() => props.x + "%");
    const yPixel = computed(() => props.y + "%");

    const playIntro = () => {
      if (self.value && shadow.value) {
        animation.dropIn(
          self.value,
          shadow.value,
          1500,
          Math.random() * (1500 - 0) + 0,
          () => animation.floating(self.value, shadow.value)
        );
      }
    };

    const clickHandler = (e: any) => {
      //   idleAnimation.value?.pause();
      emit("iconClick", {
        el: self.value,
        ...props,
        e,
      });
    };

    onMounted(() => {
      playIntro();
    });

    return {
      xPixel,
      yPixel,
      self,
      clickHandler,
      idleAnimation,
      shadow,
    };
  },
});
</script>

<style scoped>
.iconContainer {
  position: absolute;
  left: v-bind(xPixel);
  top: v-bind(yPixel);
  /* background: #000; */
  border-radius: 8px;
  cursor: pointer;
}

.shadow {
  width: 80%;
  padding-top: 100%;
  border-radius: 50%;
  background: radial-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0));
  position: absolute;
  left: 0;
  bottom: -10px;
  z-index: -1;
  transform-style: preserve-3d;
  transform: rotateX(70deg);
  opacity: 0;
  filter: blur(10px);
}
</style>
