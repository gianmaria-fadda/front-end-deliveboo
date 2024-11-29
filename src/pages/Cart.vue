<script>
import axios from 'axios';
export default {
  data() {
    return {
      cart: JSON.parse(localStorage.getItem('cart')) || [] // Recupera il carrello dal localStorage (se esiste)
    };
  },
  computed: {
    cartTotal() {
      return this.cart.reduce((total, item) => total + item.price * item.quantity, 0);
    }
  },
  methods: {
    removeFromCart(productId) {
      this.cart = this.cart.filter(item => item.id !== productId);
      this.updateLocalStorage(); // Aggiorna localStorage
    },
    updateLocalStorage() {
      localStorage.setItem('cart', JSON.stringify(this.cart)); // Salva il carrello nel localStorage
    }
  },
  watch: {
    cart: {
      handler() {
        this.updateLocalStorage(); // Ogni volta che il carrello cambia, aggiorna localStorage
      },
      deep: true
    }
  }
};
</script>

<template>
  <main>
    <div>
    <h1>Il tuo Carrello</h1>

    <!-- Se il carrello è vuoto, mostra un messaggio -->
    <div v-if="cart.length === 0">
      <p>Il carrello è vuoto. Aggiungi alcuni prodotti!</p>
    </div>

    <!-- Visualizza i prodotti nel carrello -->
    <div v-else>
      <div v-for="item in cart" :key="item.id" class="cart-item">
        <p>{{ item.name }} - Quantità: {{ item.quantity }} - €{{ item.price * item.quantity }}</p>
        <button class="rounded-pill p-1" @click="removeFromCart(item.id)">Rimuovi</button>
      </div>

      <!-- Totale del carrello -->
      <div>
        <h3>Totale: €{{ cartTotal }}</h3>
      </div>
    </div>
  </div>
  </main>
</template>

<style lang="scss" scoped>
@use '../assets/scss/partials/variables' as *;

main {
  height: 50vh;
}
.cart {
  font-family: "Chewy", system-ui;
  font-weight: 400;
  font-style: normal;
}
.cart-item {
  border-bottom: 1px solid;
  padding: 10px 0;
}

</style>
