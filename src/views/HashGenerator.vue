<script setup>
import { ref, computed } from "vue";
import CryptoJS from "crypto-js";

const length = ref(100);
const minLength = 10;
const maxLength = 1000;
const generatedHash = ref("");
const copied = ref(false);

const generateHash = () => {
  // Generate a random string of specified length
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";
  let result = "";

  // Use crypto library to generate random values
  const wordArray = CryptoJS.lib.WordArray.random(length.value);
  const base64 = CryptoJS.enc.Base64.stringify(wordArray);

  // Ensure we get exactly the requested length
  result = base64.replace(/[+/=]/g, ""); // Remove non-alphanumeric chars

  // Trim or pad to exact length
  if (result.length > length.value) {
    result = result.substring(0, length.value);
  } else {
    while (result.length < length.value) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      result += chars[randomIndex];
    }
  }

  generatedHash.value = result;
};

const copyToClipboard = () => {
  if (!generatedHash.value) return;

  navigator.clipboard.writeText(generatedHash.value);
  copied.value = true;

  setTimeout(() => {
    copied.value = false;
  }, 2000);
};

const isValidLength = computed(() => {
  const num = Number(length.value);
  return !isNaN(num) && num >= minLength && num <= maxLength;
});
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <h1
          class="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl"
        >
          Hash Generator
        </h1>
        <p
          class="mt-3 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400 sm:mt-4"
        >
          Generate random strings for use as secrets or codes
        </p>
      </div>

      <div class="mt-10 sm:mt-12">
        <div
          class="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg"
        >
          <div class="px-4 py-5 sm:p-6">
            <div
              class="flex flex-col sm:flex-row sm:items-end space-y-4 sm:space-y-0 sm:space-x-4"
            >
              <div class="flex-1">
                <label
                  for="length"
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Length ({{ minLength }}-{{ maxLength }} characters)
                </label>
                <div class="mt-1">
                  <input
                    type="number"
                    name="length"
                    id="length"
                    v-model="length"
                    :min="minLength"
                    :max="maxLength"
                    class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                  />
                </div>
              </div>
              <div>
                <button
                  type="button"
                  @click="generateHash"
                  :disabled="!isValidLength"
                  class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Generate
                </button>
              </div>
            </div>

            <div v-if="generatedHash" class="mt-8">
              <label
                for="result"
                class="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Generated Hash
              </label>
              <div class="mt-1 relative">
                <textarea
                  id="result"
                  name="result"
                  rows="5"
                  readonly
                  v-model="generatedHash"
                  class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md font-mono"
                ></textarea>
                <div class="absolute top-2 right-2">
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
              <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
                This hash is generated using cryptographically secure random
                values.
              </p>
            </div>

            <div
              v-else
              class="mt-8 text-center py-12 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <p class="text-gray-500 dark:text-gray-400">
                Click "Generate" to create a random hash
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
