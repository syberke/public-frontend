<template>
  <div class="container px-4 py-10 text-black dark:text-white bg-white dark:bg-gray-900">
    <div class="max-w-screen-xl mx-auto flex flex-col lg:flex-row gap-6">


      <div class="w-full lg:w-1/4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md 
        lg:sticky lg:top-16 max-h-screen overflow-y-auto">
        <h2 class="text-lg font-semibold mb-4">Filter</h2>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium">Search</label>
            <input v-model="searchQuery" type="text" placeholder="Search books..."
              class="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 text-black dark:text-white" />
          </div>
          <div>
            <label class="block text-sm font-medium">Stock</label>
            <select v-model="filterStock"
              class="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 text-black dark:text-white">
              <option value="">All</option>
              <option value="in">In Stock</option>
              <option value="out">Out of Stock</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium">Sort by Price</label>
            <select v-model="sortPrice"
              class="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 text-black dark:text-white">
              <option value="">None</option>
              <option value="asc">Low to High</option>
              <option value="desc">High to Low</option>
            </select>
          </div>
        </div>
      </div>

    
      <div class="w-full lg:w-3/4 lg:h-screen lg:overflow-y-auto pr-2">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          <div v-for="book in paginatedBooks" :key="book.id"
            class="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <router-link :to="{ name: 'book.show', params: { id: book.id } }">
              <div class="relative bg-gray-100 p-3 dark:bg-gray-700 flex justify-center items-center m-3 rounded-lg">
                <img :src="book.cover_image" alt="Book Image" class="h-52 object-cover" />
                <span class="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded">
                  {{ book.stock > 0 ? "In Stock" : "Out of Stock" }}
                </span>
              </div>
              <div class="p-4">
                <h2 class="text-lg font-semibold">{{ book.name }}</h2>
                <p class="text-gray-500">Rp {{ book.price.toLocaleString() }}</p>
              </div>
            </router-link>
          </div>
        </div>
        <div class="flex justify-center mt-10">
          <button v-if="currentPage < lastPage" @click="loadMoreBooks"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            View More
          </button>
          <p v-else class="text-gray-500">No More Books Available</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { apiClient } from "@/config/axios";

const books = ref([]);
const currentPage = ref(1);
const lastPage = ref(null);
const filterStock = ref("");
const sortPrice = ref("");
const searchQuery = ref("");

const listBook = async () => {
  const { data } = await apiClient.get(`/book?page=${currentPage.value}`);
  const newBooks = new Set([...books.value, ...data.data.data]);
  books.value = Array.from(newBooks);
  lastPage.value = data.data.last_page;
};

const loadMoreBooks = async () => {
  if (currentPage.value < lastPage.value) {
    currentPage.value++;
    await listBook();
  }
};

const filteredBooks = computed(() => {
  let result = [...books.value];
  if (searchQuery.value) {
    result = result.filter(book => book.name.toLowerCase().includes(searchQuery.value.toLowerCase()));
  }
  if (filterStock.value) {
    result = result.filter(book => (filterStock.value === "in" ? book.stock > 0 : book.stock === 0));
  }
  if (sortPrice.value) {
    result.sort((a, b) => (sortPrice.value === "asc" ? a.price - b.price : b.price - a.price));
  }
  return result;
});

const paginatedBooks = computed(() => filteredBooks.value.slice(0, currentPage.value * 8));

onMounted(listBook);
</script>
