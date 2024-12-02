<template>
    <div id="checkout">
      <h1>Checkout</h1>
  
      <!-- Form Dati Cliente -->
      <div class="form">
        <label>Nome Cliente</label>
        <input v-model="order.customer" type="text" placeholder="ES. Mario Rossi" required />
  
        <label>Email</label>
        <input v-model="order.email" type="email" placeholder="ES. example@email.com" required />
  
        <label>Telefono</label>
        <input v-model="order.phone" type="tel" placeholder="ES. 1234567890" required />
  
        <label>Indirizzo</label>
        <textarea v-model="order.address" placeholder="ES. Via Roma 10, Milano" required></textarea>
  
        <label>Note (opzionale)</label>
        <textarea v-model="order.notes" placeholder="ES. no le posate"></textarea>
      </div>
  
      <!-- Riepilogo Ordine -->
      <h3>Riepilogo Ordine</h3>
      <ul>
        <li v-for="item in cartItems" :key="item.id">
          {{ item.name }} - Quantità: {{ item.quantity }} - Prezzo: €{{ (item.price * item.quantity).toFixed(2) }}
        </li>
      </ul>
      <h3>Totale Ordine: €{{ order.price.toFixed(2) }}</h3>
  
      <!-- Drop-in UI -->
      <div id="dropin-container"></div>
      <button @click="processPayment" :disabled="isProcessing">
        <span v-if="isProcessing">Pagamento in corso...</span>
        <span v-else>Conferma Ordine</span>
      </button>
  
      <!-- Popup di conferma -->
      <div v-if="showPopup" class="popup-overlay">
        <div class="popup-content">
          <h2>Ordine Confermato!</h2>
          <p>Nome Cliente: {{ order.customer }}</p>
          <p>Email: {{ order.email }}</p>
          <p>Telefono: {{ order.phone }}</p>
          <p>Indirizzo: {{ order.address }}</p>
          <p>Note: {{ order.notes || 'Nessuna nota aggiunta' }}</p>
          <h3>Dettagli Ordine</h3>
          <ul>
            <li v-for="item in cartItems" :key="item.id">
              {{ item.name }} - Quantità: {{ item.quantity }} - Prezzo: €{{ (item.price * item.quantity).toFixed(2) }}
            </li>
          </ul>
          <h3>Totale Pagato: €{{ order.price.toFixed(2) }}</h3>
          <!--<p>Nonce di pagamento: {{ paymentNonce }}</p>-->
          <button @click="closePopup">Chiudi</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        order: {
          customer: "", // Nome cliente
          email: "", // Email cliente
          phone: "", // Telefono cliente
          address: "", // Indirizzo cliente
          notes: "", // Note cliente
          price: 0, // Prezzo totale (carrello)
        },
        cartItems: [], // Lista dei prodotti nel carrello
        cartTotal: 0, // Totale carrello
        dropinInstance: null,
        isProcessing: false,
        showPopup: false, // Stato del popup
        paymentNonce: "", // Nonce del pagamento
      };
    },
    mounted() {
      this.initializeDropin();
      this.loadCart(); // Carica i dati del carrello
    },
    methods: {
      async initializeDropin() {
        const authorizationToken = "sandbox_f252zhq7_hh4cpc39zq4rgjcg"; // Token statico dalla sandbox di Braintree
  
        braintree.dropin.create(
          {
            authorization: authorizationToken,
            container: "#dropin-container",
          },
          (err, instance) => {
            if (err) {
              console.error("Errore durante l'inizializzazione di Braintree:", err);
              return;
            }
            this.dropinInstance = instance;
          }
        );
      },
      loadCart() {
        const cart = JSON.parse(localStorage.getItem("cart")); // Ottieni il carrello dal localStorage
        if (cart && cart[0]?.items?.length) {
          this.cartItems = cart[0].items; // Salva gli articoli del carrello
          this.cartTotal = this.cartItems.reduce((total, item) => {
            return total + item.price * item.quantity;
          }, 0);
  
          // Calcola il prezzo totale (solo carrello)
          this.order.price = this.cartTotal;
        }
      },
      async processPayment() {
        if (!this.dropinInstance) {
          alert("Errore: Drop-in UI non inizializzata!");
          return;
        }
  
        this.isProcessing = true;
  
        // Assicurati che tutti i campi obbligatori siano compilati
        if (!this.order.customer || !this.order.email || !this.order.phone || !this.order.address) {
          alert("Compila tutti i campi obbligatori per procedere con il pagamento.");
          this.isProcessing = false;
          return;
        }
  
        this.dropinInstance.requestPaymentMethod((err, payload) => {
          if (err) {
            console.error("Errore durante la richiesta del metodo di pagamento:", err);
            this.isProcessing = false;
            return;
          }
  
          // Simula il successo del pagamento
          this.paymentNonce = payload.nonce; // Salva il nonce
          this.showPopup = true; // Mostra il popup
          this.isProcessing = false;
        });
      },
      closePopup() {
        this.showPopup = false;
      },
    },
  };
  </script>
  
  <style scoped>
  #checkout {
    padding: 20px;
  }
  
  .form label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  .form input,
  .form textarea {
    width: 100%;
    margin-bottom: 15px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .popup-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  .popup-content h2 {
    margin-bottom: 10px;
  }
  
  .popup-content button {
    background-color: #007bff;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 15px;
  }
  
  .popup-content button:hover {
    background-color: #0056b3;
  }
  </style>
  