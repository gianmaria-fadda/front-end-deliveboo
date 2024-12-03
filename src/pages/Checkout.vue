  
<script>
import axios from 'axios';

  export default {
    data() {
      return {
        order: {
          customer: "",
          email: "",
          phone: "",
          address: "",
          notes: "",
          price: 0,
        },
        cartItems: [],
        cartTotal: 0,
        dropinInstance: null,
        isProcessing: false,
        showPopup: false,
        paymentNonce: "",
      };
    },
    mounted() {
      this.initializeDropin();
      this.loadCart();
    },
    methods: {
      async initializeDropin() {
        const authorizationToken = "sandbox_f252zhq7_hh4cpc39zq4rgjcg";

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
        const cart = JSON.parse(localStorage.getItem("cart"));
        if (cart && cart[0]?.items?.length) {
          this.cartItems = cart[0].items;
          this.cartTotal = this.cartItems.reduce((total, item) => {
            return total + item.price * item.quantity;
          }, 0);

          this.order.price = this.cartTotal;
        }
      },
      async processPayment() {
        if (!this.dropinInstance) {
          alert("Errore: Drop-in UI non inizializzata!");
          return;
        }

        this.isProcessing = true;

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

          this.paymentNonce = payload.nonce;

          const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
          const newOrder = {
            customer: this.order.customer,
            email: this.order.email,
            phone: this.order.phone,
            address: this.order.address,
            notes: this.order.notes,
            items: this.cartItems,
            totalPrice: this.order.price,
          };
          storedOrders.push(newOrder);
          localStorage.setItem("orders", JSON.stringify(storedOrders));

          this.showPopup = true;
          this.isProcessing = false;
        });
      },
      async closePopup() {
  this.showPopup = false;

  // Invia i dati al backend
  const orderData = {
    email: this.order.email,
    phone: this.order.phone,
    address: this.order.address,
    notes: this.order.notes,
    price: this.order.price,
    customer: this.order.customer,
  };

  try {
    const response = await ("http://localhost:8000/api/public/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    const result = await response.json();
    if (result.success) {
      console.log("Ordine salvato nel database:", result.order);
    } else {
      console.error("Errore nel salvataggio dell'ordine:", result.error);
    }
  } catch (error) {
    console.error("Errore durante l'invio dell'ordine:", error);
  }

  localStorage.removeItem("cart");
  this.cartItems = [];
  this.cartTotal = 0;
  this.order.price = 0;

  this.$router.push({ name: "orders" });
}
    }
  }
</script>

<template>
  <div id="checkout">
    <div class="card">
      <div class="card-body">
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
        <button class="border border-0 p-2 bg-success text-light rounded-pill" @click="processPayment" :disabled="isProcessing">
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
            <!--<p>Nonce di pagamento: {{ paymentNonce }}</p>
            <a class="nav-link active" aria-current="page" href="#">
                        <router-link to="/orders" class="nav-link">I Tuoi Ordini</router-link>
                      </a>-->
            <button @click="closePopup">Chiudi</button>
          </div>

        </div>
      </div>
    </div>
  </div>

   
</template>

  
<style lang="scss" scoped>
  #checkout {
    padding: 80px;
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
