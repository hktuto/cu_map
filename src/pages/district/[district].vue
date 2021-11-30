<template>
  <game-wraper :bgColor="bgColor">
    <div class="districtContainer">
      <div :class="{ mapContainer: true, detailOpened }" ref="mapContainer">
        <div class="mapRadius">
          <object type="image/svg+xml" :data="district?.mapIcon" />
        </div>

        <div :class="{ detailContainer: true, opened: detailOpened }">
          <div class="detailClip">
            <object type="image/svg+xml" :data="detailImg"></object>
          </div>
        </div>
        <div v-if="!detailOpened" class="iconsContainer">
          <district-icon
            v-for="item in district?.mapPin"
            :key="item.icon"
            :item="item"
            @click="openDetial(item)"
          />
        </div>
      </div>
    </div>
    <div class="actionContainer" ref="actionContainer">
      <div class="homeBtn">
        <img src="/images/home.svg" @click="goHome" />
      </div>
      <div class="backBtn">
        <img src="/images/back.svg" @click="goBack" />
      </div>
    </div>
  </game-wraper>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import { onBeforeRouteLeave, useRoute, useRouter } from "vue-router";
import GameWraper from "../../components/GameWraper.vue";
import { DistrictPin, useDistrictStore } from "../../store/district";
import DistrictIcon from "../../components/DistrictIcon.vue";
import { useAppStore } from "../../store/app";

export default defineComponent({
  components: { GameWraper, DistrictIcon },
  setup() {
    // basic setup
    const route = useRoute();
    const router = useRouter();
    const appStore = useAppStore();
    const districtStore = useDistrictStore();
    const district = districtStore.getCurrentDistrist(
      route.params.district as any
    );

    const mapContainer = ref<HTMLElement>();
    const actionContainer = ref<HTMLElement>();

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

    onBeforeRouteLeave(async () => {
      if (mapContainer.value) {
        mapContainer.value.classList.add("out");
        actionContainer.value?.classList.add("out");
        await appStore.sleep(300);
      }
    });

    const goHome = () => {
      router.push({ path: "/" });
    };

    const goBack = () => {
      if (detailOpened.value) {
        detailOpened.value = false;
        return;
      }
      router.back();
    };

    return {
      goHome,
      goBack,
      district,
      bgColor,
      coverColor,
      mapContainer,
      actionContainer,
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
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  border-radius: 12px;
  overflow: visible;
  animation: circleIn 0.5s;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  .mapRadius {
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 12px;
  }
  img {
    width: 100%;
    transform: scale(1);
    transform-origin: center center;
    transition: transform 0.2s ease-in-out;
  }
  &:before {
    content: "";
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0);
    position: absolute;
    z-index: 2;
    opacity: 0;
    transition: opacity 0.4s;
    box-shadow: inset 0 0 80px 0px #000000;
    pointer-events: none;
    border-radius: 12px;
    border: 1px solid #000;
  }
  &.detailOpened {
    &:before {
      opacity: 1;
    }
    .mapRadius {
      img {
        transform: scale(2);
      }
    }
  }
  &.out {
    // clip-path: circle(0%);
    animation: circleOut 0.5s;
  }
}

.actionContainer {
  width: 1720px;

  margin: 0 auto;
  position: absolute;
  bottom: 20px;
  // left: 20px;
  display: grid;
  grid-template-columns: 65px 65px;
  gap: 10px;
  &.out {
    // clip-path: circle(0%);
    animation: circleOut 0.5s;
  }
}

@keyframes circleIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes circleOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.detailContainer {
  position: absolute;
  left: 0;
  top: 0;
  width: 1720px;
  height: 880px;
opacity: 0;
  // clip-path: circle(0%);
  // animation: detailIn ease-in 1s 1 reverse;
  .detailClip {
    border-radius: 12px;
    overflow: hidden;
    background: rgba(0, 0, 0, 0.95);
    img {
      width: 100%;
    }
  }

  // z-index: -1;
  img {
    width: 100%;
  }
  &.opened {
    opacity: 1;
    animation: detailIn ease-in 0.5s;
    // clip-path: circle(75%);
  }
}

@keyframes detailIn {
  0% {
    opacity: 0;
    // clip-path: circle(0% at v-bind(detailX) v-bind(detailY));
  }
  100% {
    opacity: 1;
    // clip-path: circle(75%);
  }
}

.iconsContainer {
  position: absolute;
  width: 1720px;
  height: 880px;
  position: absolute;
  left: 0;
  top: 0;
}
</style>
