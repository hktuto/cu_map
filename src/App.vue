<template>
  <div class="app">
    <router-view  />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAnimation } from "./store/animation";

export default defineComponent({
  setup() {
    const animation = useAnimation();
    const route = useRoute();
    const router = useRouter();

    const timer = ref(600);


    const resetTimer = () => {
      timer.value = 600;
    };

    onMounted(() => {
      window.addEventListener("resize", animation.setScale);
      window.addEventListener("click", resetTimer);
      setInterval(() => (timer.value -= 1), 1000);
    });

    onUnmounted(() => {
      window.removeEventListener("resize", animation.setScale);
      window.removeEventListener("click", resetTimer);
    });
    animation.setScale();

    watch(timer, (time) => {
      if (time <= 0) {
        resetTimer();
        if (route.name !== "index") {
          router.push({
            path: "/",
          });
        }
      }
    });
    return {
    }
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
