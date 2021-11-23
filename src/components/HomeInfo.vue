<template>
  <div class="infoContainer">
    <img
      src="/images/info_content.svg"
      style="width: 773px"
      :class="{ infoContent: true, hidden: !infoOpened }"
    />
    <img
      class="btn"
      src="/images/info_btn.svg"
      @click="infoOpened = !infoOpened"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const infoOpened = ref(false);

    return {
      infoOpened,
    };
  },
});
</script>

<style lang="scss" scoped>
.infoContainer {
  position: absolute;
  left: 30px;
  bottom: 10px;
  .btn {
    position: absolute;
    left: -20px;
    top: 10px;
  }
  .infoContent {
    opacity: 1;
    transition: opacity 0.2s;
    &.hidden {
      opacity: 0;
    }
  }
}
</style>
