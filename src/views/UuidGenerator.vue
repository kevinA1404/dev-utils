<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { v4 as uuidv4 } from "uuid";

const uuids = ref([]);
const count = ref(defaultCount);
const defaultCount = 1;
const maxCount = 500;

watch(count, (val) => {
  generateUuids(val);
});

onMounted(() => {
  generateUuids(defaultCount);
});

const generateUuids = (countToGenerate = defaultCount) => {
  uuids.value = [];
  const numToGenerate = Math.min(countToGenerate, maxCount);

  for (let i = 0; i < numToGenerate; i++) {
    uuids.value.push({
      id: i,
      value: uuidv4(),
      copied: false,
    });
  }
};

const copyToClipboard = (uuid) => {
  navigator.clipboard.writeText(uuid.value);

  // Set copied status
  uuid.copied = true;

  // Reset copied status after 2 seconds
  setTimeout(() => {
    uuid.copied = false;
  }, 2000);
};

const downloadCSV = () => {
  if (uuids.value.length === 0) return;

  const csvContent = uuids.value.map((uuid) => uuid.value).join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", "uuids.csv");
  link.style.visibility = "hidden";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const isValidCount = computed(() => {
  const num = Number(count.value);
  return !isNaN(num) && num > 0 && num <= maxCount;
});
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <h1
          class="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl"
        >
          UUID v4 Generator
        </h1>
        <p
          class="mt-3 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400 sm:mt-4"
        >
          Generate random UUID v4 strings for your applications
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
                  for="count"
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Number of UUIDs to generate (max {{ maxCount }})
                </label>
                <div class="mt-1">
                  <input
                    type="number"
                    name="count"
                    id="count"
                    v-model="count"
                    min="1"
                    :max="maxCount"
                    class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                  />
                </div>
              </div>
              <div class="flex space-x-3">
                <button
                  type="button"
                  @click="generateUuids(count)"
                  :disabled="!isValidCount"
                  class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Generate
                </button>
                <button
                  type="button"
                  @click="downloadCSV"
                  :disabled="uuids.length === 0"
                  class="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Download CSV
                </button>
              </div>
            </div>

            <div v-if="uuids.length > 0" class="mt-8">
              <div
                class="shadow overflow-hidden border-b border-gray-200 dark:border-gray-700 sm:rounded-lg"
              >
                <table
                  class="min-w-full divide-y divide-gray-200 dark:divide-gray-700"
                >
                  <thead class="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th
                        scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                      >
                        #
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                      >
                        UUID
                      </th>
                      <th scope="col" class="relative px-6 py-3">
                        <span class="sr-only">Copy</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody
                    class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700"
                  >
                    <tr
                      v-for="(uuid, index) in uuids"
                      :key="uuid.id"
                      class="hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <td
                        class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400"
                      >
                        {{ index + 1 }}
                      </td>
                      <td
                        class="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-gray-300"
                      >
                        {{ uuid.value }}
                      </td>
                      <td
                        class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                      >
                        <button
                          @click="copyToClipboard(uuid)"
                          class="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300"
                        >
                          <span v-if="uuid.copied">Copied!</span>
                          <span v-else>Copy</span>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div
              v-else-if="count > 0"
              class="mt-8 text-center py-12 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <p class="text-gray-500 dark:text-gray-400">
                Click "Generate" to create UUIDs
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
