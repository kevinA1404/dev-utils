import { createRouter, createWebHistory } from "vue-router";

// Import views
import UuidGenerator from "../views/UuidGenerator.vue";
import HashGenerator from "../views/HashGenerator.vue";
import UrlEncoder from "../views/UrlEncoder.vue";
import JsonEditor from "../views/JsonEditor.vue";
import LoremIpsum from "../views/LoremIpsum.vue";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    redirect: "/dev-utils",
  },
  {
    path: "/dev-utils",
    name: "DevUtils",
    component: Home, // If you want a home page for /dev-utils
  },
  {
    path: "/dev-utils/uuid-generator",
    name: "UuidGenerator",
    component: UuidGenerator,
  },
  {
    path: "/dev-utils/hash-generator",
    name: "HashGenerator",
    component: HashGenerator,
  },
  {
    path: "/dev-utils/url-encoder",
    name: "UrlEncoder",
    component: UrlEncoder,
  },
  {
    path: "/dev-utils/json-editor",
    name: "JsonEditor",
    component: JsonEditor,
  },
  {
    path: "/dev-utils/lorem-ipsum",
    name: "LoremIpsum",
    component: LoremIpsum,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
