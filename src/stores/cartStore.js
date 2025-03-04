import { defineStore } from "pinia";

export const useCartStore = defineStore("shop", {
  state: () => ({
    cart: JSON.parse(localStorage.getItem("cart")) || [],
  }),
  actions: {
    addToCart(book) {
      const existingBook = this.cart.find((item) => item.idBook === book.idBook);
      if (existingBook) {
        existingBook.quantity += book.quantity;
      } else {
        this.cart.push({ ...book, quantity: book.quantity });
      }
      this.saveCart(); 
    },
    updateQuantity(idBook, quantity) {
      const item = this.cart.find((b) => b.idBook === idBook);
      if (item) item.quantity = quantity;
      this.saveCart(); 
    },
    removeItem(idBook) {
      this.cart = this.cart.filter((b) => b.idBook !== idBook);
      this.saveCart();
    },
    clearCart() {
      this.cart = [];
      localStorage.removeItem("cart");
    },
    saveCart() {
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
  },
  getters: {
    totalPrice: (state) =>
      state.cart.reduce((sum, item) => sum + item.quantity * item.price, 0),
  },
});
