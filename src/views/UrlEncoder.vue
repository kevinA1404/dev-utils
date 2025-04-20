<script setup>
import { ref, computed, watch } from "vue";

const modes = [
  { id: "decode", name: "Decode" },
  { id: "encode", name: "Encode" },
];

const selectedMode = ref("decode");
const inputText = ref("");
const outputText = ref("");
const copied = ref(false);

const processInput = () => {
  if (!inputText.value) {
    outputText.value = "";
    return;
  }

  try {
    if (selectedMode.value === "encode") {
      outputText.value = encodeURIComponent(inputText.value);
    } else {
      outputText.value = decodeURIComponent(inputText.value);
    }
  } catch (error) {
    outputText.value = `Error: ${error.message}`;
  }
};

// Process the input whenever it changes or mode changes
watch(
  [inputText, selectedMode],
  () => {
    processInput();
  },
  { immediate: true }
);

const copyToClipboard = () => {
  if (!outputText.value) return;

  navigator.clipboard.writeText(outputText.value);
  copied.value = true;

  setTimeout(() => {
    copied.value = false;
  }, 2000);
};

const clearAll = () => {
  inputText.value = "";
  outputText.value = "";
};

const swapTexts = () => {
  const temp = inputText.value;
  inputText.value = outputText.value;
  outputText.value = temp;

  // Also swap the mode
  selectedMode.value = selectedMode.value === "encode" ? "decode" : "encode";
};
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <h1
          class="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl"
        >
          URL Decoder/Encoder
        </h1>
        <p
          class="mt-3 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400 sm:mt-4"
        >
          Encode or decode URLs
        </p>
      </div>

      <div class="mt-10 sm:mt-12">
        <div
          class="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg"
        >
          <div class="px-4 py-5 sm:p-6">
            <div
              class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
            >
              <div class="w-full sm:w-1/2">
                <div class="flex justify-between items-center mb-4">
                  <div>
                    <label
                      for="mode"
                      class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Mode
                    </label>
                    <div class="mt-1">
                      <div class="flex space-x-4">
                        <div
                          v-for="mode in modes"
                          :key="mode.id"
                          class="flex items-center"
                        >
                          <input
                            :id="mode.id"
                            name="mode"
                            type="radio"
                            :value="mode.id"
                            v-model="selectedMode"
                            class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 dark:border-gray-600"
                          />
                          <label
                            :for="mode.id"
                            class="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                          >
                            {{ mode.name }}
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="flex space-x-2">
                    <button
                      type="button"
                      @click="clearAll"
                      class="inline-flex items-center px-3 py-1 border border-gray-300 dark:border-gray-600 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Clear
                    </button>
                    <button
                      type="button"
                      @click="swapTexts"
                      class="inline-flex items-center px-3 py-1 border border-gray-300 dark:border-gray-600 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Swap
                    </button>
                  </div>
                </div>

                <label
                  for="input"
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Input
                </label>
                <div class="mt-1">
                  <textarea
                    id="input"
                    name="input"
                    rows="8"
                    v-model="inputText"
                    placeholder="Enter text to encode or decode"
                    class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                  ></textarea>
                </div>
              </div>

              <div class="w-full sm:w-1/2">
                <div class="h-[60px]"></div>
                <!-- Spacer to align with input -->

                <label
                  for="output"
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Output
                </label>
                <div class="mt-1 relative">
                  <textarea
                    id="output"
                    name="output"
                    rows="8"
                    readonly
                    v-model="outputText"
                    class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md font-mono"
                  ></textarea>
                  <div v-if="outputText" class="absolute top-2 right-2">
                    <button
                      type="button"
                      @click="copyToClipboard"
                      class="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <span v-if="copied">Copied!</span>
                      <span v-else>Copy</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
