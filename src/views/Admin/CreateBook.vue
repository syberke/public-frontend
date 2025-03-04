<template>
  <div class="container mx-auto p-6">
     <h1 class="text-4xl font-bold text-center dark:text-white text-black mb-6">Halaman Book</h1>
   <section v-show="inputAction" class="bg-white  shadow-lg rounded-lg p-6 max-w-lg mx-auto">
     <h2 class="text-lg text-center text-info">
       {{ isEdit ? "Edit" : "Tambah" }} Book
     </h2>
     <form class="max-w-sm mx-auto mt-11 " @submit.prevent="handleSubmitX" enctype="multipart/form-data " >
       <label
         for="username"
         class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-500"
         >Name :</label
       >
       <input
         type="text"
         id="username"
         class="my-3 bg-gray-50 border border-gray-500 text-gray-900 placeholder-gray-700 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5"
         placeholder="masukan Nama"
         v-model="name"
       />
       <label
         for="price"
         class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-500"
         >Price :</label
       >
       <input
         type="text"
         id="price"
         class="bg-gray-50 border border-gray-500 text-gray-900 placeholder-gray-700 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5"
         placeholder="masukan Harga"
         v-model="price"
       />
       <label
         for="author"
         class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-500"
         >Author :</label
       >
       <input
         type="text"
         id="author"
         class="bg-gray-50 border border-gray-500 text-gray-900 placeholder-gray-700 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5"
         placeholder="masukan Penulis"
         v-model="author"
       />
       <label
         for="year"
         class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-500"
         >Year :</label
       >
       <input
         type="text"
         id="year"
         class="bg-gray-50 border border-gray-500 text-gray-900 placeholder-gray-700 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5"
         placeholder="masukan Tahun"
         v-model="year"
       />
       <label
         for="description"
         class="my-3 block mb-2 text-sm font-medium text-gray-700 dark:text-gray-500"
         >Description :</label
       >
       <textarea
         id="description"
         rows="4"
         class="bg-gray-50 border border-gray-500 text-gray-900 placeholder-gray-700 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5"
         placeholder="Masukan Deskripsi"
         v-model="description"
       ></textarea>
       <label
         for="user_avatar"
         class="my-3 block mb-2 text-sm font-medium text-gray-700 dark:text-gray-500"
         >Upload file :</label
       >
       <input
         class="block w-full text-sm text-gray-900 bg-gray-50 border border-gray-500 rounded-lg cursor-pointer"
         aria-describedby="user_avatar_help"
         id="user_avatar"
         type="file"
         @change="handleImageUpload"
       />
       <label
         for="stock"
         class="my-3 block mb-2 text-sm font-medium text-gray-700 dark:text-gray-500"
         >stock :</label
       >
       <input
         type="text"
         id="stock"
         class="bg-gray-50 border mb-2 border-gray-300 text-gray-900 placeholder-gray-700 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5"
         placeholder="masukan Stock"
         v-model="stock"
       />
       <label
         for="genre_id"
         class="block mb-2 text-sm font-medium text-gray-500"
         >Genre Id :</label
       >
       <select
         v-model="genre_id"
         id="genre_id"
         class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
       >
         <option v-for="item in genres" :key="item.id" :value="item.id">{{ item.name }}</option>
       </select>
       <br />
       <!-- Button -->
       <button
         type="submit"
         class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
       >
         {{ isEdit ? "Edit" : "Tambah" }}
       </button>
       <button
        @click="closeForm"
         type="button"
         class="ml-5 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
       >
         Cancel
       </button>
       <br />
     </form>
   </section>
   <section>
     <div class="flex justify-center my-6">
       <button
         @click="tambahForm"
         class="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition flex items-center space-x-2"
       >
         <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
         </svg>
         <span>Tambah Book</span>
       </button>
     </div>
     <div class="relative overflow-x-auto shadow-md sm:rounded-lg ">
       <table
         class="w-9/12 mx-auto text-sm text-center rtl:text-right text-gray-500"
       >
         <thead class="text-xs text-gray-700 uppercase dark:text-white bg-gray-50 dark:bg-gray-800">
           <tr>
             <th scope="col" class="px-6 py-3">No</th>
             <th scope="col" class="px-6 py-3">Book name</th>
             <th scope="col" class="px-6 py-3">Harga</th>
             <th scope="col" class="px-6 py-3">Author</th>
             <th scope="col" class="px-6 py-3">Year</th>
             <th scope="col" class="px-6 py-3">Deskrpsi</th>
             <th scope="col" class="px-6 py-3">Cover Image</th>
             <th scope="col" class="px-6 py-3">Stock</th>
             <th scope="col" class="px-6 py-3">Genre Id</th>
             <th scope="col" class="px-6 py-3 text-right">Action</th>
             <th scope="col" class="px-6 py-3"></th>
           </tr>
         </thead>
         <tbody  v-for="(item, key) in bookData">
           <tr class="bg-gray-100 text-gray-900 dark:text-white dark:bg-gray-700">
             <td class="px-6 py-4">{{ key + 1 }}</td>
             <td class="px-6 py-4">{{ item.name }}</td>
             <td class="px-6 py-4">{{ item.price }}</td>
             <td class="px-6 py-4">{{ item.author }}</td>
             <td class="px-6 py-4">{{ item.year }}</td>
             <td class="px-6 py-4">{{ item.description }}</td>
             <td class="px-6 py-4">{{ item.cover_image }}</td>
             <td class="px-6 py-4">{{ item.stock }}</td>
             <td class="px-6 py-4">{{ item.genre_id }}</td>
             <td
                 @click="handleEdit(item)"
               class="px-6 py-4 text-center font-medium text-blue-600 dark:text-blue-500 hover:underline"
             >
               Edit
             </td>
             <td
               @click="handleDelete(item.id)"
               class="px-6 py-4 text-left font-medium text-blue-600 dark:text-blue-500 hover:underline"
             >
               Delete
             </td>
           </tr>
         </tbody>
       </table>
     </div>
     
   </section>
   </div>
 </template>
 <script setup>
 import { apiClient } from "@/config/axios";
 import { tokenUser } from "@/stores/tokenStorage";
 import { onMounted, ref } from "vue";
 import Swal from 'sweetalert2';
 
 const name = ref("");
 const id = ref("");
 const price = ref("");
 const author = ref("");
 const year = ref("");
 const description = ref("");
 const cover_image = ref(null);
 const stock = ref("");
 const genre_id = ref("");
 const inputAction = ref(false);
 const bookData = ref(null);
 const genres = ref([]);
 const isEdit = ref(false);
 
 const handleDelete = async (id) => {
   try {
     const result = await Swal.fire({
       title: "Apakah Anda yakin?",
       text: "Data ini akan dihapus secara permanen!",
       icon: "warning",
       showCancelButton: true,
       confirmButtonColor: "#d33",
       cancelButtonColor: "#3085d6",
       confirmButtonText: "Ya, hapus!",
     });
 
     if (result.isConfirmed) {
       const deleteData = await apiClient.post(
         `/book/${id}?_method=DELETE`,
         {},
         {
           headers: {
             "Content-Type": "application/json",
             Authorization: `Bearer ${tokenUser.value}`,
           },
         }
       );
       console.log(deleteData);
       await fetchBook();
       Swal.fire("Deleted!", "Data telah dihapus.", "success");
     }
   } catch (error) {
     console.log(error);
     Swal.fire("Error!", "Gagal menghapus data.", "error");
   }
 };
 
 const clearInputForm = () => {
   name.value = "";
   price.value = "";
   author.value = "";
   year.value = "";
   description.value = "";
   cover_image.value = null;
   stock.value = "";
   genre_id.value = "";
   isEdit.value = false;
 };
 
 const tambahForm = () => {
   name.value = "";
   price.value = "";
   author.value = "";
   year.value = "";
   description.value = "";
   cover_image.value = null;
   stock.value = "";
   genre_id.value = "";
   inputAction.value = true;
   isEdit.value = false;
 };
 
 const newBook = ref({
   name: "",
   price: 0,
   author: "",
   year: 0,
   description: "",
   cover_image: null,
   stock: 0,
   genre_id: null,
 });
 
 const handleImageUpload = (event) => {
   cover_image.value = event.target.files[0];
 };
 
 const handleEdit = (item) => {
   showForm();
   isEdit.value = true;
   id.value = item.id;
   name.value = item.name;
   price.value = item.price;
   author.value = item.author;
   year.value = item.year;
   description.value = item.description;
   cover_image.value = item.cover_image;
   stock.value = item.stock;
   genre_id.value = item.genre_id;
   console.log(item);
 };
 
 const showForm = async () => {
   inputAction.value = true;
 };
 
 const closeForm = async () => {
   inputAction.value = false;
 };
 
 const fetchBook = async () => {
   const { data } = await apiClient.get("/book");
   console.log(data.data);
   bookData.value = data.data?.data;
 };
 
 const fetchGenre = async () => {
   const { data } = await apiClient.get("/genre");
   genres.value = data.data;
 };
 
 const handleSubmitX = async () => {
   try {
     if (isEdit.value === true) {
       let formData = new FormData();
       formData.append("name", name.value);
       formData.append("price", price.value);
       formData.append("author", author.value);
       formData.append("year", year.value);
       formData.append("stock", stock.value);
       formData.append("description", description.value);
       if (cover_image.value) {
         formData.append("cover_image", cover_image.value);
       }
       formData.append("genre_id", genre_id.value);
       const edit = await apiClient.post(`/book/${id.value}?_method=PUT`, formData, {
         headers: {
           "Content-Type": "multipart/form-data",
           Authorization: `Bearer ${tokenUser.value}`,
         },
       });
       Swal.fire("Success!", edit.data.message, "success");
       await fetchBook();
     } else {
       let formData = new FormData();
       formData.append("name", name.value);
       formData.append("price", price.value);
       formData.append("author", author.value);
       formData.append("year", year.value);
       formData.append("stock", stock.value);
       formData.append("description", description.value);
       if (cover_image.value) {
         formData.append("cover_image", cover_image.value);
       }
       formData.append("genre_id", genre_id.value);
       const newBook = await apiClient.post("/book", formData, {
         headers: {
           "Content-Type": "multipart/form-data",
           Authorization: `Bearer ${tokenUser.value}`,
         },
       });
       Swal.fire("Success!", newBook.data.message, "success");
       await fetchBook();
     }
     clearInputForm();
     closeForm();
     await fetchBook();
   } catch (error) {
     console.log(error);
     Swal.fire("Error!", "Gagal menyimpan data.", "error");
   }
 };
 
 onMounted(() => {
   fetchBook();
   fetchGenre();
 });
 </script>