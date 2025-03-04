<template>
  <div class="dark:bg-gray-900 bg-white text-white p-6 md:p-8 shadow-lg w-full min-h-screen flex justify-center">
    <div class="max-w-screen-lg w-full mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
       
        <div class="relative bg-white shadow-lg dark:bg-gray-800 rounded-lg overflow-hidden flex justify-center items-center p-4">
          <img v-if="book.cover_image" class="h-[400px] object-cover" 
               :src="book.cover_image" alt="Book Cover" />
          <div v-else class="w-full h-80 flex items-center justify-center bg-gray-700 rounded-lg">
            <span class="text-gray-400">Image Not Available</span>
          </div>
        </div>

  
        <div class="flex flex-col justify-center px-4 md:px-6">
          <p class="text-black dark:text-gray-200 text-sm">{{ book.author }}</p>
          <h1 class="text-2xl md:text-3xl font-bold text-black dark:text-gray-200 mt-2">
            {{ book.name }} ({{ book.year }})
          </h1>

          <p class="text-black dark:text-gray-200 mt-4 text-base md:text-lg pb-4 border-b border-gray-300">
            {{ book.description }}
          </p>

          <div class="flex items-center justify-between mt-4">
            <span class="text-black dark:text-white px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-sm md:text-base">
              Stock: {{ book.stock }}
            </span>
          </div>

          <div class="flex items-center justify-between mt-4">
            <span class="text-lg font-semibold text-black dark:text-white bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-lg">
              Rp {{ book.price }}
            </span>
          </div>

          <div class="mt-4">
            <label class="text-black dark:text-gray-200 text-sm">Quantity:</label>
            <select v-model="form.quantity" class="w-full text-black dark:text-white dark:bg-gray-800 p-3 rounded-lg border border-gray-700 mt-2">
              <option v-for="n in (book.stock > 10 ? 10 : book.stock)" :key="n" :value="n">{{ n }}</option>
            </select>
          </div>


          <div class="flex flex-col md:flex-row gap-4 mt-6">
            <button v-if="book.stock > 0" @click="handleshop"
                    class="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg flex items-center gap-2 justify-center w-full md:w-auto">
              Add to Cart
            </button>

            <button v-if="book.stock > 0" @click="handlebuy"
                    class="bg-gray-600 hover:bg-gray-700 px-6 py-3 rounded-lg flex items-center gap-2 justify-center w-full md:w-auto">
              Buy Now
            </button>

            <p v-else class="text-red-500 font-semibold text-lg text-center w-full">Out of Stock</p>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { apiClient } from "@/config/axios";
import { ref, onMounted, reactive, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useCartStore } from "@/stores/cartStore";
import Swal from "sweetalert2";

const route = useRoute();
const router = useRouter();
const cartStore = useCartStore();

const book = ref({});
const form = reactive({
  book_id: computed(() => book.value?.id),
  quantity: ref(1),
});

const bookById = async () => {
  try {
    const { data } = await apiClient.get(`/book/${route.params.id}`);
    book.value = data.data;
    form.quantity = book.value.stock > 0 ? 1 : 0;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops!",
      text: "Gagal memuat data buku.",
    });
  }
};

onMounted(() => {
  bookById();
});

function handleshop() {
  if (book.value.stock > 0 && form.quantity > 0) {
    cartStore.addToCart({
      idBook: book.value.id,
      title: book.value.name,
      image: book.value.cover_image,
      price: book.value.price,
      quantity: form.quantity,
    });

    // Simpan ke localStorage setelah menambahkan ke keranjang
    cartStore.saveCart();

    Swal.fire({
      icon: "success",
      title: "Berhasil!",
      text: `${form.quantity} buku "${book.value.name}" telah ditambahkan ke keranjang.`,
      showConfirmButton: false,
      timer: 2000,
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Gagal!",
      text: book.value.stock <= 0 
        ? "Buku ini sudah tidak tersedia."
        : "Jumlah harus lebih dari 0.",
    });
  }
}


function handlebuy() {
  Swal.fire({
    title: "Konfirmasi Pembelian",
    text: `Apakah Anda yakin ingin membeli ${form.quantity} buku "${book.value.name}"?`,
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Ya, beli sekarang!",
    cancelButtonText: "Batal",
  }).then((result) => {
    if (result.isConfirmed) {
      router.push({
        path: "/buy",
        query: { book_id: form.book_id, quantity: form.quantity },
      });
    }
  });
}
</script>
