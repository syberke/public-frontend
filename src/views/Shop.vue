<template>
  <div class="container mx-auto p-10">
    <h1 class="text-2xl font-bold mb-6 text-center">Keranjang Belanja</h1>

    <div v-if="cartItems.length === 0" class="text-center text-gray-500">
      <p>Keranjang belanja Anda kosong.</p>
      <router-link to="/" class="text-blue-600 hover:underline">
        Kembali ke toko
      </router-link>
    </div>

    <div v-else class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md overflow-x-auto">
      <table class="w-full border-collapse">
        <thead>
          <tr class="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white">
            <th class="p-3 text-left">Buku</th>
            <th class="p-3 text-center">Jumlah</th>
            <th class="p-3 text-right">Harga</th>
            <th class="p-3 text-right">Total</th>
            <th class="p-3 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cartItems" :key="item.idBook" class="border-t">
            <td class="p-3 flex items-center">
              <img :src="item.image" alt="Buku" class="w-16 h-20 mr-4" />
              <p class="text-gray-900 dark:text-white">{{ item.title }}</p>
            </td>
            <td class="p-3 text-center">
              <div class="flex items-center justify-center">
                <button @click="decreaseQuantity(item)" class="px-3 py-1 bg-gray-300 dark:bg-gray-600 rounded-l text-lg">-</button>
                <span class="px-4">{{ item.quantity }}</span>
                <button @click="increaseQuantity(item)" class="px-3 py-1 bg-gray-300 dark:bg-gray-600 rounded-r text-lg">+</button>
              </div>
            </td>
            <td class="p-3 text-right">{{ priceFormat(item.price) }}</td>
            <td class="p-3 text-right">{{ priceFormat(item.price * item.quantity) }}</td>
            <td class="p-3 text-center">
              <button @click="confirmRemove(item.idBook)" class="text-red-600 hover:text-red-800">
                Hapus
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="mt-6 flex flex-col md:flex-row justify-between items-center">
        <p class="text-xl font-bold">Total: {{ priceFormat(totalPrice) }}</p>
        <router-link
          :to="generateCheckoutLink()"
          class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 mt-4 md:mt-0"
        >
          Checkout
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useCartStore } from "@/stores/cartStore";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";

const cartStore = useCartStore();
const router = useRouter();
const cartItems = computed(() => cartStore.cart);

const generateCheckoutLink = () => {
  if (cartStore.cart.length === 0) return "/order"; 

  
  const queryParams = cartStore.cart
    .map((item) => `book_id=${item.idBook}&quantity=${item.quantity}`)
    .join("&");

  return `/order?${queryParams}`;
};

const increaseQuantity = (item) => {
  cartStore.updateQuantity(item.idBook, item.quantity + 1);
};

const decreaseQuantity = (item) => {
  if (item.quantity > 1) {
    cartStore.updateQuantity(item.idBook, item.quantity - 1);
  }
};

const confirmRemove = (idBook) => {
  Swal.fire({
    title: "Hapus item?",
    text: "Item akan dihapus dari keranjang.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Ya, hapus!",
    cancelButtonText: "Batal",
  }).then((result) => {
    if (result.isConfirmed) {
      cartStore.removeItem(idBook);
      Swal.fire("Dihapus!", "Item telah dihapus.", "success");
    }
  });
};

const totalPrice = computed(() => cartStore.totalPrice);

const priceFormat = (price) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(price);
};
</script>

<style scoped>
.container {
  max-width: 900px;
}
</style>
