<template>
  <form class="card-body" @submit.prevent="handleSubmit">
    <div class="form-control">
      <label class="label">
        <span class="label-text">Bio</span>
      </label>
      <input
        type="text"
        placeholder="bio"
        class="input input-bordered"
        v-model="data.bio"
      />
    </div>
    <div class="form-control">
      <label class="label">
        <span class="label-text">Age</span>
      </label>
      <input
        type="number"
        placeholder="age"
        class="input input-bordered"
        v-model="data.age"
      />
    </div>
    <label>Image</label>
    <input
      type="file"
      class="file-input file-input-bordered file-input-success w-full max-w-xs"
      @change="handleImage"
    />
    <div class="form-control mt-6 flex flex-row justify-between">
      <button class="btn btn-primary">Update</button>
      <router-link :to="{ name: 'profile' }" class="btn">Batal</router-link>
    </div>
  </form>
</template>
<script setup>
import { apiClient } from "@/config/axios.js";
import { onMounted, ref, reactive } from "vue";
import { useAuthStorage } from "@/stores/authStorage";
import { useRouter } from "vue-router";

const authStore = useAuthStorage();

const router = useRouter();
const props = defineProps({
  isEdit: {
    type: Boolean,
    default: false,
  },
  dataUpdate: {
    type: Object,
    default: null
  }
});

const data = reactive({
    bio: "",
    age: "",
    image: null,
    id: "",
    user_id: ""
})

const user = ref("")

const getUser = async () => {
    const {data} = await apiClient.get('/me')
    user.value = data
}

const handleImage = (e) => {
    const selectedImage = e.target.files[0]
    data.image = selectedImage
}

const handleSubmit = async () => {
    let formData = new formData()
    formData.append('bio', data.bio)
    formData.append('age', data.age)
    if(data.image) {
        formData.append('image_url', data.image)
    }
    if(props.edit) {
        await apiClient.post(`/profile/${data.id}?_method=put`, formData, {
            headers: {
                Authorization: `Beerer ${authStore.tokenUser}`
            }
        })
    } else {
        await apiClient.post('/profile', formData, {
            headers: {
                Authorization: `Beerer ${authStore.tokenUser}`
            }
        })
    }
    router.push('/profile')
}

onMounted(() => {
    getUser()

    if(props.dataUpdate){
        data.id = props.dataUpdate.id
        data.user_id = props.dataUpdate.user_id
        data.bio = props.dataUpdate.bio
        data.age = props.dataUpdate.age
    }
})




</script>
