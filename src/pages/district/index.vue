<template>
  <div class="distristContainer">
    <!-- <router-link to="/"> back </router-link> -->

    <DistristBg class="bg" />
    <div class="detailContainer">
      <div class="detailBg">
        <img :src="distristData?.distristBgSvg" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import DistristBg from "../../assets/distrist_bg.svg?component";
import { Distrist, useDistristStore } from "../../store/distrist";

export default defineComponent({
  components: { DistristBg },
  setup() {
    const route = useRoute();
    const distristStore = useDistristStore();

    const component = ref<any>();

    const distristData = ref<Distrist>();
    const bgColor = ref("#fff");
    const coverColor = ref("#fff");

    onMounted(async () => {
      await distristStore.getData();
    });

    watch(
      () => distristStore.allDistrist,
      () => {
        distristData.value = distristStore.getCurrentDistrist(
          route.params.distrist as string
        );
        bgColor.value = distristData.value?.bgColor as string;
        console.log("color change");
      }
    );

    return {
      bgColor,
      coverColor,
      distristData,
    };
  },
});
</script>

<style>
.bg {
  z-index: -1;
}
.distristBgColor {
  fill: v-bind(bgColor);
}
.detailContainer {
  width: 100vw;
  height: 100vh;

  background: v-bind(bgColor);
  display: flex;
  justify-content: center;
  align-items: center;
}
.detailBg {
  width: 1720px;
  height: 880px;
  background: v-bind(coverColor);
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.5);
}
</style>
