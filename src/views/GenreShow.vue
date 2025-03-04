<script setup>
import { onBeforeMount, ref } from "vue";
import { useRoute } from "vue-router";
import { apiClient } from "@/config/axios";

const route = useRoute();
const data = ref(null);

onBeforeMount(async () => {
  await fetchDetail(route?.params?.id);
});

async function fetchDetail(id) {
  if (!id) return;

  const { data: res } = await apiClient.get(`/genre/${id}`);

  data.value = res.data;
}
</script>

<template>
  <h1 class="font-bold text-2xl text-center my-5">Showing Book with Genre "{{ data?.name }}"</h1>

  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
    <div
      v-for="item in data?.list_book"
      class="card bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <div class="relative">
        <img :src="item.cover_image" alt="Book Image" class="w-full" />
        <span
          class="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded"
        >
          {{ item.stock }}
        </span>
      </div>
      <div class="p-4">
        <h2 class="text-lg font-semibold">{{ item.name }}</h2>
        <p class="text-gray-500">Rp {{ item.price }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
