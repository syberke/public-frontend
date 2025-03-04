import { ref } from "vue";

export const tokenUser = ref(
  localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : null
);
