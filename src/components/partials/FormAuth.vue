<template>
 
    <div class="bg-white p-8 rounded-xl shadow-lg w-full max-w-md dark:text-black ">
      <h2 class="text-center text-2xl font-semibold text-gray-800 mb-5">
        {{ props.isRegist ? "Register" : "Login" }}
      </h2>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div class="form-control" v-if="props.isRegist">
          <label class="label">
            <span class="label-text text-gray-700">Name</span>
          </label>
          <input
            type="text"
            placeholder="Your Name"
            class="input-field"
            v-model="user.name"
            required
          />
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text text-gray-700">Email</span>
          </label>
          <input
            type="email"
            placeholder="Email Address"
            class="input-field"
            v-model="user.email"
            required
          />
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text text-gray-700">Password</span>
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            class="input-field"
            v-model="user.password"
            required
          />
        </div>

        <div class="form-control" v-if="props.isRegist">
          <label class="label">
            <span class="label-text text-gray-700">Confirm Password</span>
          </label>
          <input
            type="password"
            placeholder="Confirm your password"
            class="input-field"
            v-model="user.password_confirmation"
            required
          />
        </div>

        <!-- Link untuk Register/Login -->
        <div class="text-center">
          <router-link
            :to="props.isRegist ? '/login' : '/register'"
            class="text-sm text-gray-600 hover:text-gray-800 transition duration-200"
          >
            {{ props.isRegist ? "Already have an account? Login" : "Don't have an account? Register" }}
          </router-link>
        </div>

        <!-- Tombol Login/Register -->
        <div class="form-control mt-4">
          <button class="btn-primary">
            {{ props.isRegist ? "Register" : "Login" }}
          </button>
        </div>
      </form>
    </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { useAuthStorage } from "@/stores/authStorage";
import { reactive } from "vue";

const user = reactive({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
});

const authStorage = useAuthStorage();

const handleSubmit = () => {
  if (props.isRegist) {
    authStorage.RegisterUser(user);
  } else {
    authStorage.LoginUser(user);
  }
};

const props = defineProps({
  isRegist: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped>
.input-field {
  width: 100%;
  padding: 12px;
  border: 1px solid #d1d5db;
  border-radius: 12px; 
  outline: none;
  transition: border-color 0.2s ease-in-out;
}

.input-field:focus {
  border-color: #6b7280; 
}


.btn-primary {
  width: 100%;
  background-color: #1f2937;
  color: white;
  padding: 12px;
  border-radius: 12px;
  font-weight: 500;
  transition: background-color 0.2s ease-in-out;
}

.btn-primary:hover {
  background-color: #374151;
}
</style>
