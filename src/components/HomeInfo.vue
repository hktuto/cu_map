<template>
  <div class="infoContainer">
    <div
      :class="{ infoContent: true, hidden: !infoOpened }"
      @click.stop="() => {}"
    >
      <div class="scrollContainer">
        <img :src="district?.main?.info" />
      </div>
    </div>
    <div class="btn">
      <img v-if="!infoOpened" :src="district?.main?.menuOpen" @click="infoOpened = !infoOpened" />
      <img v-else :src="district?.main?.menuClose" @click="infoOpened = !infoOpened" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useDistrictStore } from "../store/district";
import { useRoute } from "vue-router";

export default defineComponent({
  setup() {
    const route = useRoute();
    const district = useDistrictStore();
    const infoOpened = ref<boolean>(!route.query.hideInfo);

    return {
      infoOpened,
      district,
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
    left: calc(50vw - 60px);
    bottom: 20px;
    background: rgba(255, 255, 255, 0.9);
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
    left: calc( 50vw - 510px);
    padding: 40px;
    border-radius: 30px;
    background: rgba(255, 255, 255, 0.9);
    overflow: hidden;
    .scrollContainer {
      width: 100%;
      height: 100%;
      padding-bottom: 40px;
      position: relative;
      img {
        width: 942px;
      }
    }
    &.hidden {
      opacity: 0;
      pointer-events: none;
    }
  }
}
</style>
