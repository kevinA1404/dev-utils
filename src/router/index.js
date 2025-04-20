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
    name: "Home",
    component: Home,
  },
  {
    path: "/uuid-generator",
    name: "UuidGenerator",
    component: UuidGenerator,
  },
  {
    path: "/hash-generator",
    name: "HashGenerator",
    component: HashGenerator,
  },
  {
    path: "/url-encoder",
    name: "UrlEncoder",
    component: UrlEncoder,
  },
  {
    path: "/json-editor",
    name: "JsonEditor",
    component: JsonEditor,
  },
  {
    path: "/lorem-ipsum",
    name: "LoremIpsum",
    component: LoremIpsum,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
