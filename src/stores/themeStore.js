import { ref, computed, watch } from "vue";
import { defineStore } from "pinia";

export const useThemeStore = defineStore("theme", () => {
  const theme = ref(localStorage.getItem("theme") || "light");

  const isDark = computed(() => theme.value === "dark");

  const setTheme = (newTheme) => {
    theme.value = newTheme;
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const toggleTheme = () => {
    setTheme(theme.value === "light" ? "dark" : "light");
  };

  const initTheme = () => {
    document.documentElement.setAttribute("data-theme", theme.value);
  };

  watch(theme, (newTheme) => {
    document.documentElement.setAttribute("data-theme", newTheme);
  }, { immediate: true });

  return {
    theme,
    isDark,
    setTheme,
    toggleTheme,
    initTheme
  };
});
