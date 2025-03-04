<template>
  <nav
    class="fixed top-0 w-full shadow-md bg-white dark:bg-gray-800 dark:text-white z-50"
  >
    <div class="px-5 lg:px-10 flex justify-between items-center py-4">
      <div class="flex items-center">
        <a href="/" class="flex items-center">
          <img src="/logoweb.svg" alt="Logo" class="w-10 h-10" />
          <span class="ml-2 text-lg font-semibold">Beyond Books & Co.</span>
        </a>
      </div>

      <ul class="hidden md:flex gap-8 flex-1 justify-center">
        <li>
          <router-link
            to="/"
            class="hover:text-blue-600 transition-all duration-300 ease-in-out"
            active-class="text-blue-600 font-bold"
          >
            Home
          </router-link>
        </li>
        <li>
          <router-link
            v-if="useStore.tokenUser"
            :to="isAdmin ? '/create-book' : '/book'"
            class="hover:text-blue-500 transition-all"
            active-class="text-blue-600 font-bold"
          >
            Product
          </router-link>
          <router-link
            v-else
            to="/login"
            class="hover:text-blue-500 transition-all"
            active-class="text-blue-600 font-bold"
          >
            Product
          </router-link>
        </li>
        <li v-if="isAdmin">
          <router-link
            to="/create-role"
            class="hover:text-blue-500 transition-all"
            active-class="text-blue-600 font-bold"
          >
            Role
          </router-link>
        </li>
        <li v-if="isAdmin">
          <router-link
            to="/create-genre"
            class="hover:text-blue-500 transition-all"
            active-class="text-blue-600 font-bold"
          >
            Genre
          </router-link>
        </li>
        <li>
          <router-link
            to="/about"
            class="hover:text-blue-500 transition-all"
            active-class="text-blue-600 font-bold"
          >
            About
          </router-link>
        </li>
        <li>
          <router-link
            to="/about-me"
            class="hover:text-blue-500 transition-all"
            active-class="text-blue-600 font-bold"
          >
            About Me
          </router-link>
        </li>
      </ul>

      <div class="flex items-center gap-4">
        <!-- Dark Mode Toggle -->
        <button
          @click="toggleDark()"
          :class="isDark ? 'text-gray-100' : 'text-yellow-500'"
        >
          <el-icon v-if="isDark" :size="20"><Moon /></el-icon>
          <el-icon v-else :size="20"><Sunny /></el-icon>
        </button>

        <div
          v-if="useStore.tokenUser"
          class="hidden md:flex items-center gap-4"
        >
          <!-- Cart hanya ikon -->
          <router-link to="/shop" class="hover:text-blue-500 transition-all">
            <Icon icon="iconamoon:shopping-card-thin" width="30" />
          </router-link>

          <router-link
            to="/profile"
            class="flex items-center gap-2 hover:text-blue-500 transition-all"
          >
            <Icon icon="material-symbols-light:person-outline" width="30" />
            <span class="text-sm font-medium">{{
              useStore.currentUser?.name
            }}</span>
          </router-link>
        </div>

        <div v-else class="hidden md:flex items-center gap-2">
          <router-link
            to="/login"
            class="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all"
          >
            Login
          </router-link>
          <router-link
            to="/register"
            class="px-3 py-1 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-all"
          >
            Register
          </router-link>
        </div>

        <button @click="isMenuOpen = !isMenuOpen" class="md:hidden">
          <Icon
            icon="mdi:menu"
            width="30"
            class="hover:text-blue-500 transition-all"
          />
        </button>
      </div>
    </div>

    <div
      v-if="isMenuOpen"
      class="md:hidden absolute inset-x-0 bg-white dark:bg-gray-800 shadow-lg rounded-b-lg z-50"
    >
      <ul class="flex flex-col items-center gap-4 py-4">
        <li>
          <router-link
            to="/"
            class="hover:text-blue-600 transition-all"
            active-class="text-blue-600 font-bold"
          >
            Home
          </router-link>
        </li>
        <li>
          <router-link
            v-if="useStore.tokenUser"
            :to="isAdmin ? '/create-book' : '/book'"
            class="hover:text-blue-500 transition-all"
            active-class="text-blue-600 font-bold"
          >
            Book
          </router-link>
          <router-link
            v-else
            to="/login"
            class="hover:text-blue-500 transition-all"
            active-class="text-blue-600 font-bold"
          >
            Book
          </router-link>
        </li>
        <li>
          <router-link
            v-if="useStore.tokenUser"
            :to="isAdmin ? '/create-role' : '/role'"
            class="hover:text-blue-500 transition-all"
            active-class="text-blue-600 font-bold"
          >
            Role
          </router-link>
        </li>
        <li v-if="isAdmin">
          <router-link
            to="/create-genre"
            class="hover:text-blue-500 transition-all"
            active-class="text-blue-600 font-bold"
          >
            Genre
          </router-link>
        </li>
        <li>
          <router-link
            to="/about"
            class="hover:text-blue-500 transition-all"
            active-class="text-blue-600 font-bold"
          >
            About
          </router-link>
        </li>
        <li>
          <router-link
            to="/about-me"
            class="hover:text-blue-500 transition-all"
            active-class="text-blue-600 font-bold"
          >
            About Me
          </router-link>
        </li>

        <li v-if="useStore.tokenUser" class="flex flex-col items-center gap-4">
          <router-link to="/shop" class="hover:text-blue-500 transition-all">
            <h1>Cart</h1>
          </router-link>

          <router-link to="/profile" class="hover:text-blue-500 transition-all">
            <h1>Profile</h1>
          </router-link>
        </li>

        <li v-else class="flex flex-col items-center gap-2">
          <router-link
            to="/login"
            class="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all"
          >
            Login
          </router-link>
          <router-link
            to="/register"
            class="px-3 py-1 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-all"
          >
            Register
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { useAuthStorage } from "@/stores/authStorage";
import { Moon, Sunny } from "@element-plus/icons-vue";
import { Icon } from "@iconify/vue";
import { useDark, useToggle } from "@vueuse/core";
import { computed, ref } from "vue";

const isDark = useDark();
const toggleDark = useToggle(isDark);

const useStore = useAuthStorage();
const isAdmin = computed(() => useStore.currentUser?.role?.name === "admin");

const isMenuOpen = ref(false);
</script>
