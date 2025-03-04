<template>
  <div class="container mx-auto my-10 px-6">

    <div class="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 max-w-2xl mx-auto">
      <div class="flex items-center gap-4">
        <Icon icon="stash:person-light" width="50" class="text-blue-500" />
        <div>
          <h1 class="text-3xl font-bold">Account</h1>
          <p class="text-gray-500 dark:text-gray-400">{{ userInfo }}</p>
        </div>
      </div>


      <div class="mt-4 flex gap-4">
        <button @click="editProfile" class="btn btn-primary px-4 py-2 text-lg">
          Edit Profile
        </button>
        <button type="button" class="btn btn-link flex items-center text-red-500" @click="handleLogout">
          <Icon icon="material-symbols:logout" width="24" />
          Log Out
        </button>
      </div>
    </div>

 
    <div class="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mt-10 max-w-2xl mx-auto">
      <h2 class="text-2xl font-bold mb-4">Order History</h2>
      <ul class="space-y-3">
        <li v-for="order in orderHistory" :key="order.id" class="flex items-center text-gray-600 dark:text-gray-400">
          <Icon icon="ic:round-check-circle" class="text-gray-500 mr-2" width="20" />
          {{ order.description }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import { useRouter } from "vue-router";
import { useAuthStorage } from "@/stores/authStorage";
import Swal from "sweetalert2";
import { ref, onMounted } from "vue";


const router = useRouter();
const authStore = useAuthStorage();


const userInfo = ref("");


const orderHistory = ref([
  { id: 1, description: "Purchased 'Vue.js Essentials'" },
  { id: 2, description: "Upgraded to Premium Membership" },
  { id: 3, description: "Ordered 'JavaScript Mastery' Book" },
]);

onMounted(() => {
  const user = JSON.parse(localStorage.getItem("user")) || authStore.user;
  if (user) {
 
    const roleName = typeof user.role === "object" ? user.role.name || "User" : user.role || "User";
    userInfo.value = `${user.name || "Guest"} - ${roleName}`;
  }
});



const editProfile = () => {
  router.push("/profile/update");
};


const handleLogout = () => {
  authStore.LogoutUser();
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  router.push("/");
  Swal.fire("Successfully logged out!");
};
</script>

<style scoped>
.container {
  max-width: 900px;
}
</style>
