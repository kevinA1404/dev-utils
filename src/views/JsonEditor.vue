<script setup>
import { ref, computed } from "vue";

const jsonInput = ref("");
const jsonOutput = ref("");
const error = ref("");
const copied = ref(false);

const validateAndBeautify = () => {
  if (!jsonInput.value.trim()) {
    error.value = "";
    jsonOutput.value = "";
    return;
  }

  try {
    // Parse the JSON to validate it
    const parsedJson = JSON.parse(jsonInput.value);

    // Stringify with pretty formatting (2 spaces indentation)
    jsonOutput.value = JSON.stringify(parsedJson, null, 2);
    error.value = "";
  } catch (e) {
    error.value = e.message;
    jsonOutput.value = "";
  }
};

const copyToClipboard = () => {
  if (!jsonOutput.value) return;

  navigator.clipboard.writeText(jsonOutput.value);
  copied.value = true;

  setTimeout(() => {
    copied.value = false;
  }, 2000);
};

const clearAll = () => {
  jsonInput.value = "";
  jsonOutput.value = "";
  error.value = "";
};

const hasValidJson = computed(() => {
  return jsonOutput.value !== "";
});

const loadSampleJson = () => {
  jsonInput.value = `{
  "name": "John Doe",
  "age": 30,
  "isActive": true,
  "address": {
    "street": "123 Main St",
    "city": "Anytown",
    "zipCode": "12345"
  },
  "phoneNumbers": [
    {
      "type": "home",
      "number": "555-1234"
    },
    {
      "type": "work",
      "number": "555-5678"
    }
  ]
}`;
  validateAndBeautify();
};

const minifyJson = () => {
  if (!jsonOutput.value) return;

  try {
    const parsedJson = JSON.parse(jsonOutput.value);
    jsonOutput.value = JSON.stringify(parsedJson);
  } catch (e) {
    // This shouldn't happen since jsonOutput is already validated
    error.value = e.message;
  }
};
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <h1
          class="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl"
        >
          JSON Editor + Beautifier
        </h1>
        <p
          class="mt-3 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400 sm:mt-4"
        >
          Validate, beautify, and edit JSON
        </p>
      </div>

      <div class="mt-10 sm:mt-12">
        <div
          class="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg"
        >
          <div class="px-4 py-5 sm:p-6">
            <div class="flex justify-between items-center mb-4">
              <div>
                <h3
                  class="text-lg leading-6 font-medium text-gray-900 dark:text-white"
                >
                  Input JSON
                </h3>
                <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Paste your JSON here to validate and beautify
                </p>
              </div>
              <div class="flex space-x-2">
                <button
                  type="button"
                  @click="loadSampleJson"
                  class="inline-flex items-center px-3 py-1 border border-gray-300 dark:border-gray-600 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Load Sample
                </button>
                <button
                  type="button"
                  @click="clearAll"
                  class="inline-flex items-center px-3 py-1 border border-gray-300 dark:border-gray-600 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Clear
                </button>
              </div>
            </div>

            <div class="mt-2">
              <textarea
                id="json-input"
                name="json-input"
                rows="10"
                v-model="jsonInput"
                placeholder="Paste your JSON here"
                class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md font-mono"
              ></textarea>
            </div>

            <div class="mt-4 flex justify-between items-center">
              <div class="flex-1">
                <div
                  v-if="error"
                  class="text-red-600 dark:text-red-400 text-sm"
                >
                  {{ error }}
                </div>
              </div>
              <div class="flex space-x-2">
                <button
                  type="button"
                  @click="validateAndBeautify"
                  class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Validate & Beautify
                </button>
                <button
                  type="button"
                  @click="minifyJson"
                  :disabled="!hasValidJson"
                  class="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Minify
                </button>
              </div>
            </div>

            <div v-if="jsonOutput" class="mt-8">
              <div class="flex justify-between items-center mb-2">
                <h3
                  class="text-lg leading-6 font-medium text-gray-900 dark:text-white"
                >
                  Formatted JSON
                </h3>
                <button
                  type="button"
                  @click="copyToClipboard"
                  class="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span v-if="copied">Copied!</span>
                  <span v-else>Copy</span>
                </button>
              </div>
              <div
                class="bg-gray-50 dark:bg-gray-700 p-4 rounded-md overflow-auto"
              >
                <pre
                  class="text-sm text-gray-800 dark:text-gray-200 font-mono whitespace-pre-wrap"
                  >{{ jsonOutput }}</pre
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
