<template>
  <div
    class="flex flex-col lg:flex-row gap-8 mx-auto p-10 justify-center items-center"
  >
  <shop/>
    <section
      class="w-full lg:w-1/3 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
    >
      <form
        action="#"
        class="mx-auto max-w-screen-xl 2xl:px-0"
        @submit.prevent="handleOrder"
      >
        <ol
          class="flex w-full max-w-2xl items-center text-center text-sm font-medium text-gray-500 sm:text-base"
        >
          <li
            :class="{
              'text-blue-600':
                paymentStatus === 'pending' || paymentStatus === 'success',
              'text-gray-500': paymentStatus === 'idle',
            }"
            class="flex items-center after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10"
          >
            <span
              class="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] sm:after:hidden"
            >
              <svg
                class="me-2 h-4 w-4 sm:h-5 sm:w-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              Checkout
            </span>
          </li>

          <li
            :class="{
              'text-blue-600': paymentStatus === 'success',
              'text-gray-500': paymentStatus !== 'success',
            }"
            class="flex shrink-0 items-center"
          >
            <svg
              class="me-2 h-4 w-4 sm:h-5 sm:w-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            Success
          </li>
        </ol>

        <div class="mt-6 space-y-4">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
            Delivery Details
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-black">
            <input
              type="text"
              placeholder="First Name"
              v-model="form.first_name"
              required
              class="input-style"
            />
            <input
              type="text"
              placeholder="Last Name"
              v-model="form.last_name"
              required
              class="input-style"
            />
            <input
              type="email"
              placeholder="Email"
              v-model="form.email"
              required
              class="input-style"
            />
            <input
              type="text"
              placeholder="Address"
              v-model="form.address"
              required
              class="input-style"
            />
          </div>
        </div>

        <div class="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <p class="text-base text-gray-500 dark:text-gray-300">
            Subtotal: x{{ route.query?.quantity }} -
            {{ priceFormat(itemsBook?.price) }}
          </p>
          <p class="text-lg font-bold text-gray-900 dark:text-white">
            Total: {{ priceFormat(totalPrice) }}
          </p>
        </div>

        <button
          type="submit"
          class="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          @click="orderItem(item)"
        >
          Proceed to payment
        </button>
      </form>
    </section>
  </div>
</template>

<script setup>
  import { apiClient } from "@/config/axios";
import { tokenUser } from "@/stores/tokenStorage";
import axios from "axios";
import Swal from "sweetalert2";
import { computed, onBeforeMount, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import Shop from "./Shop.vue";

const route = useRoute(); 
const itemsBook = ref(null);
const paymentStatus = ref("idle");
const orderItems = [];

const form = reactive({
  first_name: "",
  last_name: "",
  email: "",
  address: "",
  idBook: route.query?.book_id,
  quantity: route.query?.quantity,
});
const params = new URLSearchParams(window.location.search);
params.forEach((value, key) => {
  if (key === "book_id") {
    orderItems.push({ book_id: value });
  } else if (key === "quantity" && orderItems.length > 0) {
    orderItems[orderItems.length - 1].quantity = parseInt(value);
  }
});
const totalPrice = computed(() => {
  return itemsBook.value?.price * route.query?.quantity;
});
onBeforeMount(async () => {
  await fetchBook();
});
const fetchBook = async () => {
  const { data } = await apiClient.get(`/book/${route.query?.book_id}`);
  itemsBook.value = data.data;
};

const token = localStorage.getItem("token");
const orderItem = async () => {
  try {
    paymentStatus.value = "pending";
    const response = await apiClient.post("/pay", form, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenUser.value}`,
      },
    });
    const newData = response.data;
    const snapToken = newData.snap_token;
    const orderParams = newData.order.id;

    if (snapToken) {
      window.snap.pay(snapToken, {
        onSuccess: function (result) {
  axios.post(
    `https://book-store-backend-production-9682.up.railway.app/api/v1/order/${orderParams}?_method=PUT`,
    {
      status: "SUCCESS",
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenUser.value}`,
      },
    }
  );
  paymentStatus.value = "success";
  
  orderItems.length = 0;  
console.log("Cart setelah dihapus:", orderItems);
  Swal.fire({
    title: "Payment Success",
    text: `Payment Success`,
    icon: "success",
    confirmButtonColor: "#4CAF50",
    cancelButtonColor: "#d33",
    confirmButtonText: "Ok",
  }).then(() => {
    window.location.href = "/book";
  });
},

        onPending: function (result) {
          paymentStatus.value = "pending";
          Swal.fire({
            title: "Payment Pending",
            text: `Your payment is still pending.`,
            icon: "warning",
            confirmButtonColor: "#4CAF50",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ok",
          });
        },
        onError: function (result) {
          axios.post(
            `https://book-store-backend-production-9682.up.railway.app/api/v1/order/${orderParams}?_method=DELETE`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          paymentStatus.value = "idle";
          alert("Payment failed!");
        },
        onClose: function () {
          Swal.fire({
            title: "Are you sure to close?",
            text: `Your payment will be canceled.`,
            icon: "warning",
            confirmButtonColor: "#d33",
            confirmButtonText: "Yes, close it",
            showCancelButton: true,
          }).then((result) => {
            if (result.isConfirmed) {
              paymentStatus.value = "idle";
              Swal.fire(
                "Payment Canceled",
                "Your payment was canceled.",
                "error"
              );
            }
          });
        },
      });
    }
  } catch (error) {
    console.error(error);
    paymentStatus.value = "idle";
  }
};


const priceFormat = (price) => {
  const rupiah = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(price);
  return rupiah;
};
console.log(orderItems);

</script>

<style scoped>
.input-style {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: white;
}
</style>
