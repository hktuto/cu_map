<template>
  <div class="mapCntainer">
    <img class="bg" src="/images/home_bg.svg" />
    <HomeButton class="bg" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import anime from "animejs";
export default defineComponent({
  setup() {
    const init = () => {
      //
    };

    return {};
  },
});
</script>
<style scoped>
.bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
