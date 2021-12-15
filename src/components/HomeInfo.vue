<template>
  <div class="infoContainer" >
    <div :class="{ infoContent: true, hidden: !infoOpened }" @click.stop="() => {}">
      <div class="scrollContainer">
        <img
          src="/images/info_content.svg"
        />
      </div>
    </div>
    <div class="btn">
      <img
        src="/images/menu.svg"
        @click="infoOpened = !infoOpened"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const infoOpened = ref(true);

    return {
      infoOpened,
    };
  },
});
</script>

<style lang="scss" scoped>
.infoContainer {
  position: absolute;
  width:100%;
  bottom: 0;
  .btn {
    position:absolute;
    width: 120px;
    height: 120px;
    left: calc(50% - 60px);
    bottom: 20px;
    background: rgba(255,255,255,0.8);
    border-radius: 50%;
    padding: 10px;
    img{
      width:100%;
    }
  }
  .infoContent {
    opacity: 1;
    transition: opacity 0.2s;
    position: absolute;
    bottom: 80px;
    left: 15%;
    width: 70%;
    height: 80vh;
    padding: 40px;
    border-radius: 20px;
    background: rgba(255,255,255,0.8);
    overflow: hidden;
    .scrollContainer {
      width:100%;
      height:100%;
      overflow: auto;
    }
    &.hidden {
      opacity: 0;
      pointer-events: none;
    }
  }
}
</style>
