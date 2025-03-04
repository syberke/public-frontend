<template>
  <div class="mb-40">
    <div>
      <div class="mx-10 mb-14 mt-10">
        <h1 class="text-2xl font-bold">Genre</h1>
        <!-- <div>
          <form class="mt-10">
            <label for="underline_select" class="sr-only"
              >Underline select</label
            >
            <select
              id="underline_select"
              class="block py-2.5 px-0 w-40 text-sm text-center text-black bg-transparent link border-gray-200 appearance-none dark:text-black dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
            >
              <option selected>Choose a Genre</option>
              <option value="US">T-Shirt</option>
              <option value="CA">Kemeja</option>
              <option value="FR">France</option>
              <option value="DE">Germany</option>
            </select>
          </form>
        </div> -->

        <div
          class="inline-flex items-center justify-center flex-wrap gap-5 my-10"
        >
          <div class="" v-for="prd in listGenre">
            <router-link
              :to="{ name: 'genre.show', params: { id: prd.id } }"
              class="badge badge-lg text-lg hover:font-medium hover:border-neutral"
            >
              {{ prd.name }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { apiClient } from "@/config/axios";
import { onMounted } from "vue";
import { ref } from "vue";

const listGenre = ref("");

const getGenre = async () => {
  const { data } = await apiClient.get("/genre");

  listGenre.value = data.data;

  console.log(listGenre.value);
};

const props = defineProps({
  data: {
    required: true,
    type: Object,
  },
});

onMounted(() => {
  getGenre();
});
</script>
