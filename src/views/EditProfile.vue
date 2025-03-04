<template>
  <form
    class="max-w-sm mx-auto mt-11 mb-10"
    @submit.prevent="handleSumbitX"
    enctype="multipart/form-data"
  >
    <label for="bio" class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-500">Bio :</label>
    <input
      type="text"
      id="bio"
      class="my-3 bg-gray-50 border border-gray-500 text-gray-900 placeholder-gray-700 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5"
      placeholder="Masukkan bio"
      v-model="bio"
    />

    <label for="age" class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-500">Age :</label>
    <input
      type="text"
      id="age"
      class="bg-gray-50 border border-gray-500 text-gray-900 placeholder-gray-700 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5"
      placeholder="Masukkan umur"
      v-model="age"
    />

    <label for="user_avatar" class="my-3 block mb-2 text-sm font-medium text-gray-700 dark:text-gray-500">Image:</label>
    <input
      class="block w-full text-sm text-gray-900 bg-gray-50 border border-gray-500 rounded-lg cursor-pointer"
      aria-describedby="user_avatar_help"
      id="user_avatar"
      type="file"
      @change="handleImageUpload"
    />
    
    <br />

    <!-- Button -->
    <button
      type="submit"
      class="text-white bg-blue-400 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
    >
      Tambah
    </button>

    <router-link
      to="/profile"
      class="ml-5 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      >Cancel</router-link
    >
  </form>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStorage } from "@/stores/authStorage";
import { useRouter } from "vue-router";
import { apiClient } from "@/config/axios";
import Swal from "sweetalert2";

const authStore = useAuthStorage();
const bio = ref("");
const age = ref("");
const image = ref(null);
const router = useRouter();

const handleImageUpload = (event) => {
  image.value = event.target.files[0];
};

const clearInputForm = () => {
  bio.value = "";
  age.value = "";
  image.value = null;
};

const handleSumbitX = async () => {
  try {
    let formData = new FormData();
    formData.append("bio", bio.value);
    formData.append("age", age.value);
    if (image.value) {
      formData.append("image", image.value);
    }

    const response = await apiClient.post("/profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${authStore.tokenUser}`,
      },
    });

    Swal.fire({
      icon: "success",
      title: "Berhasil!",
      text: response.data.message,
      confirmButtonColor: "#3085d6",
    });

    clearInputForm();
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Gagal!",
      text: error.response?.data?.message || "Terjadi kesalahan saat mengirim data",
      confirmButtonColor: "#d33",
    });
  }
};

</script>
