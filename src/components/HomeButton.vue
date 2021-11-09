<template>
  <HomeIcons />
</template>

<script lang="ts">
import anime from "animejs";
import { defineComponent, onMounted, onUnmounted, ref } from "vue";
import { useRouter } from "vue-router";
import HomeIcons from "../assets/Home_button.svg?component";

export default defineComponent({
  components: { HomeIcons },
  setup() {
    const els = ref<any>([]);
    const router = useRouter();
    const itemClick = (e: any) => {
      console.log("item clicked");
      const parent = e.target.closest(".distristIcon");
      const distrist = parent.getAttribute("data-distrist");
      router.push({
        path: "/" + distrist,
      });
    };
    const startAnimate = () => {
      anime({
        targets: ".distristIcon",
        translateY: [
          { value: -10, easing: "easeOutSine", duration: 500 },
          { value: 0, easing: "easeInOutQuad", duration: 1200 },
        ],
        easing: "easeOutQuad",
        zIndex: [{ value: 2 }, { value: 2 }, { value: 1 }],
        loop: true,
        delay: anime.stagger(500),
      });
    };

    onMounted(() => {
      startAnimate();
      els.value = document.querySelectorAll(".distristIcon");
      els.value.forEach((el: any) => el.addEventListener("click", itemClick));
      console.log(els.value);
    });

    onUnmounted(() => {
      els.value.forEach((el: any) =>
        el.removeEventListener("click", itemClick)
      );
      console.log("unmount");
    });

    return {};
  },
});
</script>
