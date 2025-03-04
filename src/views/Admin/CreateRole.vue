<template>
    <div class="container mx-auto p-6">
      <h1 class="text-4xl font-bold text-center dark:text-white text-black mb-6">Halaman Role</h1>
      
      <section v-show="inputAction" class="bg-white shadow-lg rounded-lg p-6 max-w-lg mx-auto">
        <h2 class="text-xl font-semibold text-gray-700 text-center mb-4">
          {{ isEdit ? "Edit" : "Tambah" }} Role
        </h2>
        <form @submit.prevent="actionRole" class="space-y-4 text-black">
          <input
            type="text"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Masukan Nama Role"
            v-model="name"
          />
          <div class="flex justify-center space-x-4">
            <button
              type="submit"
              class="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              {{ isEdit ? "Edit" : "Tambah" }}
            </button>
            <button
              @click="closeForm"
              type="button"
              class="px-5 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </section>
      

      <div class="flex justify-center my-6">
        <button
          @click="tambahForm"
          class="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition flex items-center space-x-2"
        >
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          <span>Tambah Role</span>
        </button>
      </div>
  

      <div class="bg-white dark:bg-gray-700 shadow-lg rounded-lg p-6">
        <table class="w-full text-gray-700 dark:text-white">
          <thead>
            <tr class="border-b">
              <th class="py-2">No</th>
              <th class="py-2">Nama Role</th>
              <th class="py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, key) in roleData" :key="item.id" class="border-b">
              <td class="py-2 text-center">{{ key + 1 }}</td>
              <td class="py-2 text-center">{{ item.name }}</td>
              <td class="py-2 flex justify-center space-x-4">
                <button @click="handleEdit(item)" class="text-blue-600 hover:underline">Edit</button>
                <button @click="handleDelete(item.id)" class="text-red-600 hover:underline">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script setup>
  import { apiClient } from "@/config/axios";
  import { onMounted, ref } from "vue";
  import Swal from "sweetalert2";
  import { tokenUser } from "@/stores/tokenStorage";
  
  const name = ref("");
  const id = ref("");
  const inputAction = ref(false);
  const roleData = ref(null);
  const isEdit = ref(false);
  
  const fetchRole = async () => {
    try {
      const { data } = await apiClient.get("/role");
      roleData.value = data.data;

    } catch (error) {
      console.error("Gagal mengambil data role:", error);
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Data ini akan dihapus secara permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, hapus!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await apiClient.delete(`/role/${id}`, {
            headers: {
              Authorization: `Bearer ${tokenUser.value}`,
              
            },
            
          });
          Swal.fire("Deleted!", "Data telah dihapus.", "success");
          await fetchRole();
        } catch (error) {
          console.error(error);
          
        }
      }
    });
  };
  

  const clearInputForm = () => {
    name.value = "";
    isEdit.value = false;
  };
  
  
  const tambahForm = () => {
    name.value = "";
    inputAction.value = true;
    isEdit.value = false;
  };
  
 
  const handleEdit = (item) => {
    inputAction.value = true;
    isEdit.value = true;
    id.value = item.id;
    name.value = item.name;
  };
  

  const closeForm = () => {
    inputAction.value = false;
  };
  
  
  const actionRole = async () => {
    const url = isEdit.value ? `/role/${id.value}?_method=PUT` : "/role";
    try {
      const response = await apiClient.post(url, { name: name.value }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenUser.value}`,
          
        },
      });
  
      Swal.fire("Succses!", response.data.message, "success");
      await fetchRole();
      clearInputForm();
      closeForm();
    } catch (error) {
      console.error(error);
      
      if (error.response && error.response.status === 422) {
        Swal.fire("Error!", "Role already exists!", "error");
      } else {
        Swal.fire("Error!", "Something went wrong, please try again!", "error");
      }
    }
  };
  
  // Fetch data saat komponen dimuat
  onMounted(() => {
    fetchRole();
  });
  </script>
  
  <style>
  body {
    background-color: #f8fafc;
    font-family: 'Inter', sans-serif;
  }
  </style>