<script setup>
import image from "@/components/img/profile.JPG";
</script>

<template>
  <section class="bg-white dark:bg-gray-900">
    <div class="py-12 px-6 mx-auto max-w-screen-xl lg:py-16 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="text-4xl font-extrabold text-gray-900 dark:text-white">About Me</h2>
        <p class="text-gray-500 dark:text-gray-400 mt-4 text-lg">
          Explore my journey in web development and open-source contributions,
          built with passion and precision.
        </p>
      </div>

      <div class="flex flex-col items-center md:flex-row md:items-start bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-8">
        <img
          class="w-48 h-48 rounded-lg object-cover mb-6 md:mb-0 md:mr-8"
          :src="image"
          alt="Berke Avatar"
        />
        <div>
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white">Qiageng Berke Jaisyurrohman</h3>
          <span class="text-gray-600 dark:text-gray-400 block mt-2">Junior Web Developer</span>
          <p class="mt-4 text-gray-600 dark:text-gray-300 text-lg">
            Learning Laravel, Vue.js, and PERN stack to build full-stack web
            applications with modern frameworks. Focused on mastering
            Programming, Design, Network, and IoT.
          </p>
          <div class="mt-6 flex space-x-4">
            <a href="#" class="text-gray-500 hover:text-blue-600 dark:hover:text-white">
              <i class="fab fa-facebook-f text-2xl"></i>
            </a>
            <a href="#" class="text-gray-500 hover:text-blue-400 dark:hover:text-white">
              <i class="fab fa-twitter text-2xl"></i>
            </a>
            <a href="https://github.com/syberke/" class="text-gray-500 hover:text-gray-900 dark:hover:text-white">
              <i class="fab fa-github text-2xl"></i>
            </a>
            <a href="#" class="text-gray-500 hover:text-green-500 dark:hover:text-white">
              <i class="fab fa-whatsapp text-2xl"></i>
            </a>
            <a href="#" class="text-gray-500 hover:text-blue-700 dark:hover:text-white">
              <i class="fab fa-linkedin-in text-2xl"></i>
            </a>
            <a href="#" class="text-gray-500 hover:text-pink-500 dark:hover:text-white">
              <i class="fab fa-instagram text-2xl"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>