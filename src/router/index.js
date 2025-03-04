import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import Genre from "../views/Genre.vue";
import Book from "../views/Book.vue";
import Login from "../views/auth/Login.vue";
import Register from "../views/auth/Register.vue";
// import Role from "../views/Admin/Role.vue";

import Profile from "@/views/Profile.vue";
import buy from "@/views/buy.vue";
import Shop from "@/views/Shop.vue";
import BookShow from "@/views/BookShow.vue";

import { useAuthStorage } from "@/stores/authStorage";
import Verifikasi from "@/views/auth/Verifikasi.vue";
import Swal from "sweetalert2";
import EditProfile from "@/views/EditProfile.vue";

import CreateGenre from "@/views/Admin/CreateGenre.vue";
import CreateRole from "@/views/Admin/CreateRole.vue";
import CreateBook from "@/views/Admin/CreateBook.vue";
import OrderView from "@/views/OrderView.vue";
import Contact2 from "@/components/partials/contact2.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      component: AboutView,
    },
    {
      path: "/genre",
      name: "genre",
      component: Genre,
    },
    {
      path: "/about-me",
      name: "about-me",
      component: Contact2,
    },
    {
      path: "/create-genre",
      name: "create-genre",
      component: CreateGenre,
      // meta: { isAdmin: true },
    },
    {
      path: "/create-book",
      name: "create-book",
      component: CreateBook,
    
    },
    {
      path: "/create-role",
      name: "create-role",
      component: CreateRole,
    
    },
    {
      path: "/order",
      name: "order",
      component: OrderView,
      
    },
    {
      path: "/book",
      name: "book",
      component: Book,
    },
    {
      path: "/book/:id/detail",
      name: "book.show",
      component: BookShow,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: { isGuest: true },
    },
    {
      path: "/register",
      name: "register",
      component: Register,
      meta: { isEmailVerified: true },
    },
    {
      path: "/verifikasi",
      name: "verifikasi",
      component: Verifikasi,
      meta: { isAuth: true },
    },
    // {
    //   path: "/role",
    //   name: "role",
    //   component: Role,
    //   meta: { isAdmin: true, isAdmin: true },
    // },
    {
      path: "/profile",
      name: "profile",
      component: Profile,
      meta: { isAuth: true },
    },
    // {
    //   path: "/profile-edit",
    //   name: "profile-edit",
    //   component: Profile,
    //   meta: { isAuth: true },
    // },
    {
      path: "/profile/update",
      name: "updateProfile",
      component: EditProfile,
      meta: { isEmailVerified: true, isAuth: true },
    },
    {
      path: "/shop",
      name: "shop",
      component: Shop,
    },
    {
      path: "/buy",
      name: "cart",
      component: buy,
    },
  ],
});

router.beforeEach((to) => {
  const authStore = useAuthStorage();
  if (to.meta.isGuest && localStorage.getItem("token")) {
    Swal.fire("Anda Sudah Login");
    return {
      path: "/",
    };
  }
  if (
    to.meta.isEmailVerified &&
    authStore.currentUser?.email_verified_at === null
  ) {
    Swal.fire("Anda Belum Verifikasi");
    return {
      path: "/verifikasi",
    };
  }
  if (to.meta.isAuth && !localStorage.getItem("token")) {
    Swal.fire("Login Telebih dahulu");
    return {
      path: "/login",
    };
  }
  if (to.meta.isAdmin && authStore.currentUser.role.name !== "admin") {
    Swal.fire("Anda bukan Admin");
    return {
      path: "/",
    };
  }
});

export default router;
