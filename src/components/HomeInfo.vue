<template>
  <div class="infoContainer">
    <div
      :class="{ infoContent: true, hidden: !infoOpened }"
      @click.stop="() => {}"
    >
      <div class="scrollContainer">
        <img src="/images/info_content-01.png" />
      </div>
    </div>
    <div class="btn">
      <img src="/images/menu.svg" @click="infoOpened = !infoOpened" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  setup() {
    const route = useRoute();
    const infoOpened = ref<boolean>(!!route.query.hideInfo || true);

    return {
      infoOpened,
    };
  },
});
</script>

<style lang="scss" scoped>
.infoContainer {
  position: absolute;
  width: 100%;
  bottom: 0;
  .btn {
    position: absolute;
    width: 120px;
    height: 120px;
    left: calc(50% - 60px);
    bottom: 20px;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 50%;
    padding: 10px;
    img {
      width: 100%;
    }
  }
  .infoContent {
    opacity: 1;
    transition: opacity 0.2s;
    position: absolute;
    bottom: 80px;
    left: 430px;
    width: 1062px;
    height: 70vh;
    padding: 40px;
    border-radius: 30px;
    background: rgba(255, 255, 255, 0.8);
    overflow: hidden;
    .scrollContainer {
      width: 100%;
      height: 100%;
      overflow: auto;
      position: relative;
      img {
        width: 100%;
      }
    }
    &.hidden {
      opacity: 0;
      pointer-events: none;
    }
  }
}
</style>
