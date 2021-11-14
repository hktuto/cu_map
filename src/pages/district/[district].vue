<template>
  <game-wraper :bgColor="bgColor">
    <div class="districtContainer">
      <div class="mapContainer" ref="mapContainer">
        <img :src="district?.mapIcon" />
        <div v-if="!detailOpened" class="iconsContainer">
          <district-icon
            v-for="item in district?.mapPin"
            :key="item.icon"
            :item="item"
            @click="openDetial(item)"
          />
        </div>
        <div :class="{ detailContainer: true, opened: detailOpened }">
          <object type="image/svg+xml" :data="detailImg"></object>
        </div>
        <div class="actionContainer">
          <div class="homeBtn">
            <img src="/images/home.svg" @click="goHome" />
          </div>
          <div class="backBtn">
            <img src="/images/back.svg" @click="goBack" />
          </div>
        </div>
      </div>
    </div>
  </game-wraper>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import GameWraper from "../../components/GameWraper.vue";
import { DistrictPin, useDistrictStore } from "../../store/district";
import DistrictIcon from "../../components/DistrictIcon.vue";

export default defineComponent({
  components: { GameWraper, DistrictIcon },
  setup() {
    // basic setup
    const route = useRoute();
    const router = useRouter();
    const districtStore = useDistrictStore();
    const district = districtStore.getCurrentDistrist(
      route.params.district as any
    );

    const mapContainer = ref<HTMLElement>();

    const bgColor = computed(() => district?.bgColor);
    const coverColor = computed(() => district?.coverColor);

    const detailOpened = ref(false);
    const detailImg = ref("");
    const detailX = ref("0%");
    const detailY = ref("0%");

    const openDetial = (item: DistrictPin) => {
      console.log(DataTransferItemList);
      detailImg.value = item.detailImg;
      detailX.value = item.x + "%";
      detailY.value = item.y + "%";
      detailOpened.value = true;
    };

    const goHome = () => {
      if (mapContainer.value) {
        mapContainer.value.classList.add("out");
      }
      setTimeout(() => {
        router.push({ path: "/" });
      }, 300);
    };

    const goBack = () => {
      if (detailOpened.value) {
        detailOpened.value = false;
        return;
      }
      if (mapContainer.value) {
        mapContainer.value.classList.add("out");
      }
      setTimeout(() => {
        router.back();
      }, 1000);
    };

    return {
      goHome,
      goBack,
      district,
      bgColor,
      coverColor,
      mapContainer,
      openDetial,
      detailImg,
      detailX,
      detailY,
      detailOpened,
    };
  },
});
</script>

<style lang="scss" scoped>
.districtContainer {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  &.out {
    animation: circleOut 1s;
  }
}
.mapContainer {
  width: 1720px;
  height: 880px;
  background: v-bind(coverColor);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
  animation: circleIn 0.5s;
  position: relative;
  img {
    width: 100%;
  }
  &.out {
    clip-path: circle(0%);
    animation: circleOut 0.5s;
  }
}

.actionContainer {
  position: absolute;
  bottom: -80px;
  left: 0px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

@keyframes circleIn {
  0% {
    clip-path: circle(0%);
  }
  100% {
    clip-path: circle(75%);
  }
}

@keyframes circleOut {
  0% {
    clip-path: circle(75%);
  }
  100% {
    clip-path: circle(0%);
  }
}

.detailContainer {
  position: absolute;
  left: 0;
  top: 0;
  width: 1720px;
  height: 880px;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(20px);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
  // animation: detailIn ease-in 1s 1 reverse;
  clip-path: circle(0%);
  // z-index: -1;
  img {
    width: 100%;
  }
  &.opened {
    animation: detailIn ease-in 0.5s;
    clip-path: circle(75%);
  }
}

@keyframes detailIn {
  0% {
    clip-path: circle(0% at v-bind(detailX) v-bind(detailY));
  }
  100% {
    clip-path: circle(75%);
  }
}

.iconsContainer {
  width: 100%;
  padding-top: 56%;
  position: absolute;
  left: 0;
  top: 0;
}
</style>
