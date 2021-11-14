<template>
  <div class="iconContainer" @click="clickHandler">
    <img :src="item.homeIcon" ref="self" />
    <div class="shadow" ref="shadow"></div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, PropType, ref } from "vue";
import { useAnimation } from "../store/animation";
import { Distrist } from "../store/district";

export default defineComponent({
  props: {
    item: {
      type: Object as PropType<Distrist>,
      default: () => ({
        name: "",
        bgColor: "",
        coverColor: "",
        homeIcon: "",
        homeIconX: 0,
        homeIconY: 0,
      }),
    },
  },
  emits: ["iconClick"],
  setup(props, { emit }) {
    const self = ref<any>();
    const shadow = ref<any>();
    const animation = useAnimation();

    const idleAnimation = ref<anime.AnimeInstance>();

    const xPixel = computed(() => props.item.homeIconX + "%");
    const yPixel = computed(() => props.item.homeIconY + "%");

    const playIntro = () => {
      if (self.value && shadow.value) {
        animation.dropIn(
          self.value,
          shadow.value,
          1500,
          Math.random() * (800 - 0) + 0,
          () => animation.floating(self.value, shadow.value)
        );
      }
    };

    const clickHandler = (e: any) => {
      //   idleAnimation.value?.pause();
      emit("iconClick", {
        el: self.value,
        item: props.item,
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
  cursor: pointer;
  transform: scale(1);
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
