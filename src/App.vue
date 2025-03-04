<script setup>
import { RouterView, useRoute } from "vue-router";
import Navbar from "./components/partials/Navbar.vue";
import Footer from "./components/partials/Footer.vue";

const route = useRoute();
</script>

<template>
  <main class="font-sans min-h-screen">
    <!-- Navbar -->
    <Navbar v-if="!['/login', '/register'].includes(route.path)" />

    <!-- Notifikasi Verifikasi -->
    <div
      v-if="showVerificationNotice"
      class="bg-yellow-400 text-black py-2 text-center font-semibold cursor-pointer"
      @click="redirectToVerification"
    >
      ⚠️ Akun Anda belum terverifikasi! Klik di sini untuk verifikasi.
    </div>

    <!-- Router View -->
    <router-view></router-view>

    <!-- Footer (disembunyikan di login & register) -->
    <Footer v-if="!['/login', '/register'].includes(route.path)" />
  </main>
</template>
