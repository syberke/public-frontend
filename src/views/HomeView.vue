<template>
  <div class="w-full min-h-screen overflow-x-hidden">
    <Header />
    <panel />

    <div class="w-full bg-gray-100 dark:bg-gray-900 flex flex-col items-center py-10">
      <div class="w-full max-w-screen-xl px-6">
        <h1 class="text-3xl font-bold mb-8 text-center text-black dark:text-white">
          Our Books Collection
        </h1>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div
            v-for="item in localData"
            :key="item.id"
            class="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <router-link :to="{ name: 'book.show', params: { id: item.id } }">
              <div class="relative bg-gray-100 p-3 dark:bg-gray-700 flex justify-center items-center m-3 rounded-lg">
                <img
                  :src="item.cover_image"
                  alt="Book Cover"
                  class="h-52 object-cover max-w-full rounded"
                />
                <span class="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded">
                  {{ item.stock > 0 ? "In Stock" : "Out of Stock" }}
                </span>
              </div>
              <div class="p-4">
                <h2 class="text-lg font-semibold text-gray-900 dark:text-white truncate">{{ item.name }}</h2>
                <p class="text-gray-500 font-semibold mt-2 dark:text-gray-300">
                  Rp {{ item.price.toLocaleString() }}
                </p>
              </div>
            </router-link>
          </div>
        </div>

        <div class="mt-12 flex justify-center">
          <button
            @click="goToBooks"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            View More
          </button>
        </div>
      </div>
    </div>

    <Review />
    <Feature />
    <Contact />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { apiClient } from "@/config/axios";

import panel from "../components/partials/panel.vue";
import Review from "../components/partials/Review.vue";
import Header from "../components/partials/Header.vue";
import Feature from "../components/partials/Feature.vue";
import Contact from "../components/partials/Contact.vue";

const router = useRouter();
const localData = ref([]);

const goToBooks = () => {
  router.push("/book");
};

const showProd = async () => {
  try {
    const { data } = await apiClient.get("/book");
    localData.value = data.data.data;
  } catch (error) {
    console.error("Error fetching books:", error);
  }
};

onMounted(() => {
  showProd();
});
</script>

<style>
html, body {
  overflow-x: hidden;
}
</style>
