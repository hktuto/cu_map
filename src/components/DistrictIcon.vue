<template>
  <div class="districtIconContainer">
    <div class="shadow" ref="shadow"></div>
    <img class="icon" :src="item.icon" ref="self" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, PropType, ref } from "vue";
import { onBeforeRouteLeave } from "vue-router";
import { useAnimation } from "../store/animation";
import { useAppStore } from "../store/app";
import { DistrictPin } from "../store/district";

export default defineComponent({
  props: {
    item: {
      type: Object as PropType<DistrictPin>,
      default: () => ({
        x: 0,
        y: 0,
        icon: "",
        detailImg: "",
      }),
    },
  },
  setup(props) {
    const xPercent = computed(() => props.item.x + "%");
    const yPercent = computed(() => props.item.y + "%");
    const self = ref<any>();
    const shadow = ref<any>();
    const animation = useAnimation();
    const intro = ref<anime.AnimeTimelineInstance>();
    onMounted(() => {
      intro.value = animation.dropIn(
        self.value,
        shadow.value,
        1500,
        Math.random() * (800 - 0) + 0,
        () => animation.floating(self.value, shadow.value, [0, -20], 3000)
      );
    });

    return {
      self,
      xPercent,
      yPercent,
      shadow,
    };
  },
});
</script>

<style scoped>
.districtIconContainer {
  position: absolute;
  left: v-bind(xPercent);
  top: v-bind(yPercent);
  /* background: #000; */
  cursor: pointer;
  transform: scale(1);
}
.icon {
  z-index: 2;
}
.shadow {
  width: 80%;
  padding-top: 100%;
  border-radius: 50%;
  background: radial-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0));
  position: absolute;
  left: 10%;
  bottom: -10px;
  transform-style: preserve-3d;
  transform: rotateX(70deg);
  opacity: 0;
  filter: blur(10px);
}
</style>
