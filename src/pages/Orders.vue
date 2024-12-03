<script>
    export default {
    data() {
        return {
        orders: [], // Array per salvare i dati degli ordini
        };
    },
    mounted() {
        this.loadOrders();
    },
    methods: {
        loadOrders() {
        const storedOrders = localStorage.getItem("orders");
        if (storedOrders) {
            this.orders = JSON.parse(storedOrders);
        }
        },
        deleteOrder(index) {
        // Rimuovi l'ordine dall'array
        this.orders.splice(index, 1);
        // Aggiorna il localStorage
        localStorage.setItem("orders", JSON.stringify(this.orders));
    },
    },
    };
</script>

<template>
    <div id="orders">
      <h1>I Tuoi Ordini</h1>
      <div v-if="orders.length > 0">
        <div v-for="(order, index) in orders" :key="index" class="order-card">
          <h3>Ordine #{{ index + 1 }}</h3>
          <p><strong>Nome Cliente:</strong> {{ order.customer }}</p>
          <p><strong>Email:</strong> {{ order.email }}</p>
          <p><strong>Telefono:</strong> {{ order.phone }}</p>
          <p><strong>Indirizzo:</strong> {{ order.address }}</p>
          <p><strong>Note:</strong> {{ order.notes || 'Nessuna nota aggiunta' }}</p>
          <ul>
            <li v-for="item in order.items" :key="item.id">
              {{ item.name }} - Quantità: {{ item.quantity }} - Prezzo: €{{ (item.price * item.quantity).toFixed(2) }}
            </li>
            <hr />
          </ul>
          <div class="d-flex justify-content-between">
            
            <p><strong>Totale Pagato:</strong> €{{ order.totalPrice.toFixed(2) }}</p>

            <button class="btn-delete border border-0 px-3 py-2 bg-danger text-light rounded-pill" @click="deleteOrder(index)">Elimina Ordine</button>

          </div>
        </div>
      </div>
      <div v-else>
        <p>Non ci sono ordini disponibili.</p>
      </div>
    </div>
</template>

<style scoped>
    #orders {
    padding: 20px;
    }

    .order-card {
    margin-bottom: 20px;
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f9f9f9;
    }
</style>