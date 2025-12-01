import { ref, computed } from "vue";

const cart = ref([]);

export function useCart() {
  const addProduct = (product) => {
    const existing = cart.value.find(p => p.id === product.id);
    if (existing) {
      existing.quantity++;
    } else {
      cart.value.push({ ...product, quantity: 1 });
    }
  };

  const removeProduct = (id) => {
    cart.value = cart.value.filter(p => p.id !== id);
  };

  const updateQty = (id, qty) => {
    const item = cart.value.find(p => p.id === id);
    if (item) item.quantity = qty;
  };

  const clearCart = () => {
    cart.value = [];
  };

  const total = computed(() =>
    cart.value.reduce((sum, p) => sum + p.price * p.quantity, 0)
  );

  return {
    cart,
    addProduct,
    removeProduct,
    updateQty,
    clearCart,
    total
  };
}
