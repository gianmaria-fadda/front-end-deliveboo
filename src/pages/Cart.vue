<script>
export default {
  data() {
    return {
      cart: [], // Carrello locale
    };
  },
  mounted() {
    this.loadCart(); // Carica i dati del carrello dal localStorage all'avvio
  },
  methods: {
    loadCart() {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        this.cart = JSON.parse(savedCart); // Inizializza il carrello
        console.log("Carrello caricato:", this.cart);
      }
    },
    increaseQuantity(item) {
      item.quantity++;
      this.updateLocalStorage();
    },
    decreaseQuantity(item) {
      if (item.quantity > 1) {
        item.quantity--;
      } else {
        this.removeItem(item);
      }
      this.updateLocalStorage();
    },
    removeItem(item) {
      console.log("Rimuovi elemento:", item);
      this.cart[0].items = this.cart[0].items.filter(
        (cartItem) => cartItem.id !== item.id
      );
      if (this.cart[0].items.length === 0) {
        this.cart = []; // Svuota il carrello se non ci sono più elementi
      }
      this.updateLocalStorage();
    },
    updateLocalStorage() {
      localStorage.setItem("cart", JSON.stringify(this.cart));
      console.log("Carrello aggiornato:", this.cart);
    },
    CartTotal() {
      if (this.cart.length === 0 || !this.cart[0]?.items?.length) {
        return 0; // Restituisce 0 se il carrello è vuoto
      }
      return this.cart[0].items.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);
    },
  },
};
</script>


<template>
  <div class="container">
    <h1>Il tuo Carrello</h1>

    <!-- Contenuto del carrello -->
    <div v-if="cart.length > 0 && cart[0]?.items?.length">
      <div v-for="item in cart[0].items" :key="item.id" class="cart-item">
        <p>
          {{ item.name }} - Quantità: {{ item.quantity }} - Totale:
          €{{ (item.quantity * item.price).toFixed(2) }}
        </p>
        <button @click="increaseQuantity(item)" class="btn btn-success">+</button>
        <button @click="decreaseQuantity(item)" class="btn btn-warning">-</button>
        <button @click="removeItem(item)" class="btn btn-danger">Rimuovi</button>
      </div>
      <div class="cart-total">
        <h3>Totale Ordine: €{{ CartTotal().toFixed(2) }}</h3>
      </div>
    </div>

    <!-- Messaggio se il carrello è vuoto -->
    <div v-else>
      <p>Il carrello è vuoto. Aggiungi alcuni prodotti!</p>
    </div>
  </div>
</template>

<style scoped>
.container {
  padding: 20px;
}

.cart-item {
  margin-bottom: 10px;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.btn {
  margin: 5px;
}

.btn-success {
  background-color: #28a745;
  border: none;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

.btn-success:hover {
  opacity: 0.8;
}

.btn-warning {
  background-color: #ffc107;
  border: none;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

.btn-warning:hover {
  opacity: 0.8;
}

.btn-danger {
  background-color: #dc3545;
  border: none;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

.btn-danger:hover {
  opacity: 0.8;
}

.cart-total {
  margin-top: 20px;
  font-size: 1.2em;
  font-weight: bold;
}
</style>
