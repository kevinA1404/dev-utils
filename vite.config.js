import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Icons from "unplugin-icons/vite";
import Components from "unplugin-vue-components/vite";
import IconsResolver from "unplugin-icons/resolver";

export default defineConfig({
  base: "dev-utils",
  plugins: [
    vue(),
    Components({
      resolvers: [
        IconsResolver({
          prefix: "Icon", // Optional: <Icon... /> usage
        }),
      ],
    }),
    Icons({
      autoInstall: true, // auto install icon packages on demand
    }),
  ],
});
