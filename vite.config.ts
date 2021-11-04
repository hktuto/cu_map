import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import Components from "unplugin-vue-components/vite";
import Pages from "vite-plugin-pages";
import vueSvgPlugin from "vite-plugin-vue-svg";

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.ELECTRON == "true" ? "./" : ".",
  plugins: [
    vue(),
    vueSvgPlugin({
      svgoConfig: {
        cleanupIDs: false,
        removeHiddenElems: false,
        removeEmptyContainers: false,
        removeUselessDefs: false,
        removeUnknownsAndDefaults: false,
        removeNonInheritableGroupAttrs: false,
        removeViewBox: false,
        moveElemsAttrsToGroup: false,
        moveGroupAttrsToElems: false,
        collapseGroups: false,
        removeEmptyAttrs: false,
        removeTitle: false,
        removeDesc: false,
        cleanupAttrs: false,
        removeEditorsNSData: false,
      },
    }),
    Components(),
    Pages(),
  ],
});
