import { ref, watch } from "vue";
import { defineStore } from "pinia";
import { apiClient } from "@/config/axios";
import Swal from "sweetalert2";
import { useRouter } from "vue-router";

export const useAuthStorage = defineStore("auth", () => {
  const router = useRouter();

  // State untuk token dan user
  const tokenUser = ref(
    localStorage.getItem("token")
      ? JSON.parse(localStorage.getItem("token"))
      : null
  );

  const currentUser = ref(
    localStorage.getItem("user") && localStorage.getItem("user") != "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );

  // Fungsi Register User
  const RegisterUser = async (inputData) => {
    try {
      const { name, email, password, password_confirmation } = inputData;
      const { data } = await apiClient.post("/auth/register", {
        name,
        email,
        password,
        password_confirmation,
      });

      Swal.fire("Berhasil Buat Akun", "Silakan login untuk masuk", "success");
      console.log(data);

      router.push("/login");
    } catch (error) {
      console.error(error);
      Swal.fire("Gagal Mendaftar", "Coba lagi nanti", "error");
    }
  };

  // Fungsi Login User
  const LoginUser = async (inputData) => {
    try {
      const { email, password } = inputData;
      const { data } = await apiClient.post("/auth/login", {
        email,
        password,
      });

      Swal.fire("Berhasil Login", "Selamat datang!", "success");
      console.log(data);

      tokenUser.value = data.token;
      currentUser.value = data.user;

      // Simpan data ke localStorage
      localStorage.setItem("token", JSON.stringify(tokenUser.value));
      localStorage.setItem("user", JSON.stringify(currentUser.value));

      router.replace("/");
    } catch (error) {
      Swal.fire("Gagal Login", "Periksa kembali email dan password", "error");
    }
  };

  // Fungsi Logout User
  const LogoutUser = async () => {
    try {
      await apiClient.post("/auth/logout", "", {
        headers: {
          Authorization: `Bearer ${tokenUser.value}`,
        },
      });

      // Hapus data user & token dari localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Reset state di Pinia
      tokenUser.value = null;
      currentUser.value = null;

      // Redirect ke halaman login
      router.push("/login");

      Swal.fire("Berhasil Logout", "Anda telah keluar", "success");
    } catch (error) {
      console.error(error);
      Swal.fire("Gagal Logout", "Terjadi kesalahan", "error");
    }
  };

  // Fungsi untuk mendapatkan data user saat ini
  const getMe = async () => {
    try {
      const { data } = await apiClient.get("/auth/me", {
        headers: {
          Authorization: `Bearer ${tokenUser.value}`,
        },
      });

      console.log(data.user);

      localStorage.setItem("user", JSON.stringify(data.user));
      currentUser.value = data.user;
    } catch (error) {
      console.error(error);
    }
  };

  // Fungsi Verifikasi Akun dengan OTP
  const verifikasiAccount = async (otp) => {
    try {
      await apiClient.post(
        "/auth/verifikasi-akun",
        { otp },
        {
          headers: {
            Authorization: `Bearer ${tokenUser.value}`,
          },
        }
      );

      getMe();

      router.replace("/profile");
    } catch (error) {
      console.error(error);
    }
  };

  // Fungsi Generate OTP Code
  const GenerateOtpCode = async (email) => {
    try {
      const { data } = await apiClient.post(
        "/auth/generate-otp-code",
        { email },
        {
          headers: {
            Authorization: `Bearer ${tokenUser.value}`,
          },
        }
      );

      Swal.fire("Berhasil Generate OTP", "Silakan cek email Anda", "success");
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Memantau perubahan tokenUser agar navbar otomatis update
  watch(() => tokenUser.value, (newToken) => {
    if (!newToken) {
      router.push("/login");
    }
  });

  return {
    RegisterUser,
    LoginUser,
    tokenUser,
    currentUser,
    LogoutUser,
    verifikasiAccount,
    getMe,
    GenerateOtpCode,
  };
});
