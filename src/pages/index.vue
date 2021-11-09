<template>
  <div class="mapCntainer">
    <img class="bg" src="/images/home_bg.svg" />
    <HomeButton />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
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
  z-index: -1;
  width: 100%;
  height: auto;
}
</style>
