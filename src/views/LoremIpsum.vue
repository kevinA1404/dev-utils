<script setup>
import { ref, computed, onMounted } from "vue";

const modes = [
  { id: "words", name: "Words" },
  { id: "sentences", name: "Sentences" },
  { id: "paragraphs", name: "Paragraphs" },
];

const selectedMode = ref("sentences");
const count = ref(3);
const minCount = 1;
const maxCount = {
  words: 1000,
  sentences: 100,
  paragraphs: 50,
};

const generatedText = ref("");
const copied = ref(false);

// Lorem ipsum dictionary
const lorem = {
  words: [
    "lorem",
    "ipsum",
    "dolor",
    "sit",
    "amet",
    "consectetur",
    "adipiscing",
    "elit",
    "sed",
    "do",
    "eiusmod",
    "tempor",
    "incididunt",
    "ut",
    "labore",
    "et",
    "dolore",
    "magna",
    "aliqua",
    "enim",
    "ad",
    "minim",
    "veniam",
    "quis",
    "nostrud",
    "exercitation",
    "ullamco",
    "laboris",
    "nisi",
    "aliquip",
    "ex",
    "ea",
    "commodo",
    "consequat",
    "duis",
    "aute",
    "irure",
    "dolor",
    "in",
    "reprehenderit",
    "voluptate",
    "velit",
    "esse",
    "cillum",
    "dolore",
    "eu",
    "fugiat",
    "nulla",
    "pariatur",
    "excepteur",
    "sint",
    "occaecat",
    "cupidatat",
    "non",
    "proident",
    "sunt",
    "culpa",
    "qui",
    "officia",
    "deserunt",
    "mollit",
    "anim",
    "id",
    "est",
    "laborum",
    "sed",
    "perspiciatis",
    "unde",
    "omnis",
    "iste",
    "natus",
    "error",
    "voluptatem",
    "accusantium",
    "doloremque",
    "laudantium",
    "totam",
    "rem",
    "aperiam",
    "eaque",
    "ipsa",
    "quae",
    "ab",
    "illo",
    "inventore",
    "veritatis",
    "quasi",
    "architecto",
    "beatae",
    "vitae",
    "dicta",
    "explicabo",
    "nemo",
    "ipsam",
    "voluptatem",
    "quia",
    "voluptas",
    "aspernatur",
    "odit",
    "fugit",
    "consequuntur",
    "magni",
    "dolores",
    "eos",
    "ratione",
    "sequi",
    "nesciunt",
    "neque",
    "porro",
    "quisquam",
    "est",
    "qui",
    "dolorem",
    "ipsum",
    "quia",
    "dolor",
    "sit",
    "amet",
    "consectetur",
    "adipisci",
    "velit",
    "sed",
  ],
};

onMounted(() => {
  generateLoremIpsum();
});

// Generate random words
const generateWords = (count) => {
  const result = [];
  const wordCount = Math.min(count, maxCount.words);

  for (let i = 0; i < wordCount; i++) {
    const randomIndex = Math.floor(Math.random() * lorem.words.length);
    result.push(lorem.words[randomIndex]);
  }

  // Capitalize first word
  if (result.length > 0) {
    result[0] = result[0].charAt(0).toUpperCase() + result[0].slice(1);
  }

  return result.join(" ");
};

// Generate random sentences
const generateSentences = (count) => {
  const result = [];
  const sentenceCount = Math.min(count, maxCount.sentences);

  for (let i = 0; i < sentenceCount; i++) {
    // Generate a sentence with 5-15 words
    const wordCount = Math.floor(Math.random() * 11) + 5;
    let sentence = generateWords(wordCount);

    // Add period at the end
    if (!sentence.endsWith(".")) {
      sentence += ".";
    }

    result.push(sentence);
  }

  return result.join(" ");
};

// Generate random paragraphs
const generateParagraphs = (count) => {
  const result = [];
  const paragraphCount = Math.min(count, maxCount.paragraphs);

  for (let i = 0; i < paragraphCount; i++) {
    // Generate a paragraph with 3-8 sentences
    const sentenceCount = Math.floor(Math.random() * 6) + 3;
    const paragraph = generateSentences(sentenceCount);

    result.push(paragraph);
  }

  return result.join("\n\n");
};

const generateLoremIpsum = () => {
  switch (selectedMode.value) {
    case "words":
      generatedText.value = generateWords(count.value);
      break;
    case "sentences":
      generatedText.value = generateSentences(count.value);
      break;
    case "paragraphs":
      generatedText.value = generateParagraphs(count.value);
      break;
    default:
      generatedText.value = "";
  }
};

const copyToClipboard = () => {
  if (!generatedText.value) return;

  navigator.clipboard.writeText(generatedText.value);
  copied.value = true;

  setTimeout(() => {
    copied.value = false;
  }, 2000);
};

const currentMaxCount = computed(() => {
  return maxCount[selectedMode.value];
});

const isValidCount = computed(() => {
  const num = Number(count.value);
  return !isNaN(num) && num >= minCount && num <= currentMaxCount.value;
});
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <h1
          class="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl"
        >
          Lorem Ipsum Generator
        </h1>
        <p
          class="mt-3 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400 sm:mt-4"
        >
          Generate placeholder text for your designs
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
              <div>
                <label
                  for="mode"
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Generation Mode
                </label>
                <div class="mt-1">
                  <select
                    id="mode"
                    name="mode"
                    v-model="selectedMode"
                    class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                  >
                    <option
                      v-for="mode in modes"
                      :key="mode.id"
                      :value="mode.id"
                    >
                      {{ mode.name }}
                    </option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  for="count"
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Count (max {{ currentMaxCount }})
                </label>
                <div class="mt-1">
                  <input
                    type="number"
                    name="count"
                    id="count"
                    v-model="count"
                    :min="minCount"
                    :max="currentMaxCount"
                    class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                  />
                </div>
              </div>

              <div class="sm:ml-auto">
                <button
                  type="button"
                  @click="generateLoremIpsum"
                  :disabled="!isValidCount"
                  class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Generate
                </button>
              </div>
            </div>

            <div v-if="generatedText" class="mt-8">
              <div class="flex justify-between items-center mb-2">
                <h3
                  class="text-lg leading-6 font-medium text-gray-900 dark:text-white"
                >
                  Generated Text
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
                <p
                  class="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap"
                >
                  {{ generatedText }}
                </p>
              </div>
            </div>

            <div
              v-else
              class="mt-8 text-center py-12 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <p class="text-gray-500 dark:text-gray-400">
                Click "Generate" to create placeholder text
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
