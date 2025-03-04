<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-300 dark:bg-gray-900 text-black">
    <div class="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
      <h2 class="text-center text-2xl font-semibold text-gray-800 mb-5">Verifikasi OTP</h2>

      <form @submit.prevent="handleVerif" class="space-y-4">
        <div class="form-control">
          <label class="label">
            <span class="label-text text-gray-700">Kode OTP</span>
          </label>
          <input
            type="number"
            placeholder="Masukkan Kode OTP"
            class="input-field"
            v-model="otp"
            required
          />
        </div>

        <div class="flex justify-between">
          <p class="text-sm text-gray-600">Tidak menerima kode?</p>
          <button class="link link-primary text-sm" type="button" @click="generateOtp">Kirim Ulang OTP</button>
        </div>

        <div class="form-control mt-4">
          <button class="btn-primary">Verifikasi</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useAuthStorage } from "@/stores/authStorage";
import { ref } from "vue";

const authStore = useAuthStorage();
const otp = ref("");

const handleVerif = () => {
  authStore.verifikasiAccount(otp.value);
};

const generateOtp = () => {
  authStore.GenerateOtpCode(authStore.currentUser.email);
};
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
