<script setup>
import { CircleCheck, RefreshRight, ShoppingCartFull, TrophyBase } from "@element-plus/icons-vue";
</script>
<template>
    
    <footer class="bg-gray-100 dark:bg-gray-800 mt-8">
        <div class="mx-auto grid max-w-screen-xl gap-y-8 gap-x-12 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4 lg:px-10">
            <div class="max-w-sm">
                <div class="mb-6 flex h-12 items-center space-x-2">
                    <span class="text-2xl font-bold">Book<span class="text-blue-600">Shop</span>.</span>
                </div>
                <div class="text-gray-500">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis ad a officia ea expedita!</div>
            </div>
            <div>
                <div class="mt-4 mb-2 font-medium lg:mb-4">Address</div>
                <div class="text-gray-500">
                    35 Remida Heights, <br />
                    45 Street, <br />
                    South Caroline, US
                </div>
            </div>
            <div>
                <div class="mt-4 mb-2 font-medium lg:mb-4">Links</div>
                <nav aria-label="Footer Navigation" class="text-gray-500">
                    <ul class="space-y-3">
                        <li><a class="hover:text-blue-600 hover:underline" href="#">Pricing</a></li>
                        <li><a class="hover:text-blue-600 hover:underline" href="#">Demo</a></li>
                        <li><a class="hover:text-blue-600 hover:underline" href="#">Press</a></li>
                        <li><a class="hover:text-blue-600 hover:underline" href="#">Support Hub</a></li>
                        <li><a class="hover:text-blue-600 hover:underline" href="#">Contact</a></li>
                    </ul>
                </nav>
            </div>
            <div>
                <div class="mt-4 mb-2 font-medium lg:mb-4">Subscribe to our Newsletter</div>
                <div class="flex flex-col">
                    <div class="mb-4">
                        <input type="email" class="focus:outline-none mb-2 block h-10 w-full rounded-xl bg-gray-200 px-4 sm:w-80 focus:ring-1 focus:ring-blue-600" placeholder="Enter your email" />
                        <button class="block rounded-xl bg-blue-600 px-6 py-2 font-medium text-white">Subscribe</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="bg-gray-300 dark:bg-gray-900">
            <div class="mx-auto flex max-w-screen-xl flex-col gap-y-4 px-4 py-3 text-center text-gray-500 sm:flex-row sm:justify-between sm:text-left">
                <div>© 2025 Bekasi | All Rights Reserved</div>
                <div>
                    <a href="#" class="hover:underline">Privacy Policy</a>
                    <span>|</span>
                    <a href="#" class="hover:underline">Terms of Service</a>
                </div>
            </div>
        </div>
    </footer>
</template>