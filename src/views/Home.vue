<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const tools = [
  {
    name: "UUID Generator",
    description: "Generate UUID v4 strings",
    route: "/uuid-generator",
  },
  {
    name: "Hash Generator",
    description: "Generate random strings for use as secrets or codes",
    route: "/hash-generator",
  },
  {
    name: "URL Decoder/Encoder",
    description: "Encode or decode URLs",
    route: "/url-encoder",
  },
  {
    name: "JSON Editor + Beautifier",
    description: "Validate, beautify, and edit JSON",
    route: "/json-editor",
  },
  {
    name: "Lorem Ipsum Generator",
    description: "Generate placeholder text for your designs",
    route: "/lorem-ipsum",
  },
];

const navigateTo = (route) => {
  router.push(route);
};
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <header class="bg-white dark:bg-gray-800 shadow">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
          Dev Utils
        </h1>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Developer utilities for your everyday tasks
        </p>
      </div>
    </header>

    <main>
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div class="px-4 py-6 sm:px-0">
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div
              v-for="tool in tools"
              :key="tool.name"
              @click="navigateTo(tool.route)"
              class="flex flex-col justify-between bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg cursor-pointer transition-all duration-300 hover:shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <div class="px-4 py-5 sm:p-6">
                <div class="flex items-center">
                  <IconHeroiconsOutlineWrenchScrewdriver />
                  <div class="ml-5 w-0 flex-1">
                    <dt
                      class="text-lg font-medium text-gray-900 dark:text-white truncate"
                    >
                      {{ tool.name }}
                    </dt>
                    <dd
                      class="flex items-baseline text-sm text-gray-500 dark:text-gray-400"
                    >
                      {{ tool.description }}
                    </dd>
                  </div>
                </div>
              </div>
              <div class="bg-gray-50 dark:bg-gray-700 px-4 py-4 sm:px-6">
                <div class="text-sm">
                  <a
                    href="#"
                    class="font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500"
                  >
                    Open tool <span aria-hidden="true">&rarr;</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
