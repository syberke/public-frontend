<script setup>
import { Splide, SplideSlide } from "@splidejs/vue-splide";
</script>

<template>
  <section class="bg-white dark:bg-gray-900">
    <div
      class="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12"
    >
      <div class="mr-auto place-self-center lg:col-span-7 ">
        <h1
          class="font-sans max-w-2xl mb-4 text-3xl font-semibold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white"
        >
          Toko Buku Digital untuk Semua
        </h1>
        <p
          class="font-sans max-w-2xl mb-6 text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400"
        >
        BiblioNus adalah     
        </p>

        <div class="space-y-4 sm:space-y-0 sm:flex sm:items-center">
          <a
            href="/book"
            class="font-sans inline-flex items-center px-6 py-3 text-lg font-medium text-white bg-blue-700 rounded-lg shadow-md hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 mr-3"
          >
            Get started
            <svg
              class="w-5 h-5 ml-2 "
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </a>
          <a
            href="#"
            class="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
          >
            Speak to Sales
          </a>
        </div>
      </div>

      <div class="hidden lg:mt-0 lg:col-span-5 lg:flex w-full">
        <Splide
          :options="{
            type: 'slide',
            perPage: 1,
            perMove: 1,
            autoplay: true,
            interval: 3000,
            pauseOnHover: false,
            rewind: true,
            speed: 800,
            arrows: false,
            pagination: true,
          }"
          aria-label="Banner Images"
        >
          <SplideSlide>
            <img src="../img/1.png" class="rounded-lg" alt="Banner 1" />
          </SplideSlide>
          <SplideSlide>
            <img src="../img/2.png" class="rounded-lg" alt="Banner 2" />
          </SplideSlide>
          <SplideSlide>
            <img src="../img/3.png" class="rounded-lg" alt="Banner 3" />
          </SplideSlide>
        </Splide>
      </div>
    </div>
  </section>
</template>
