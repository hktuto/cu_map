<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted } from "vue";
import { useAnimation } from "./store/animation";
import { useDistrictStore } from "./store/district";

export default defineComponent({
  setup() {
    const animation = useAnimation();
    const district = useDistrictStore();

    district.getData();

    onMounted(() => {
      window.addEventListener("resize", animation.setScale);
    });

    onUnmounted(() => {
      window.removeEventListener("resize", animation.setScale);
    });
    animation.setScale();
  },
});
</script>

<style>
body,
html {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

* {
  box-sizing: border-box;
}

.bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
