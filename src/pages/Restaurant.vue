<script>
import axios from "axios";

export default {
  data() {
    return {
      restaurant: null, // Dati del ristorante
      cart: [], // Carrello locale
      showPopup: false, // Controllo per mostrare il popup di errore
      showSuccessPopup: false, // Controllo per mostrare il popup di successo
      successMessage: "", // Messaggio del popup di successo
    };
  },
  mounted() {
    const restaurantId = this.$route.params.id;
    this.getSingleRestaurant(restaurantId); // Carica i dettagli del ristorante
    this.loadCart(); // Inizializza il carrello leggendo dal localStorage
  },
  methods: {
    async getSingleRestaurant(id) {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/public/restaurant/${id}`
        );
        this.restaurant = response.data; // Salva i dettagli del ristorante
      } catch (error) {
        console.error("Errore nel caricamento del ristorante:", error);
      }
    },
    loadCart() {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        this.cart = JSON.parse(savedCart); // Inizializza il carrello
        console.log("Carrello caricato:", this.cart);
      }
    },
    AddToCart(product) {
      console.log("Tentativo di aggiungere al carrello:", product);

      // Se il carrello è vuoto, inizializza il carrello con il ristorante corrente
      if (this.cart.length === 0) {
        if (this.restaurant) {
          this.cart.push({
            restaurantId: this.restaurant.id,
            items: [],
          });
        } else {
          console.warn("Ristorante non trovato!");
          return;
        }
      }

      const cartRestaurantId = this.cart[0].restaurantId;

      // Controllo ristorante
      if (this.restaurant.id !== cartRestaurantId) {
        console.warn("Ristorante non valido per questo carrello.");
        this.showPopup = true; // Mostra il popup di errore
        return; // Blocca qualsiasi altra azione
      }

      // Controlla se il prodotto esiste già nel carrello
      const existingProduct = this.cart[0].items.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        this.cart[0].items.push({
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
        });
      }

      // Aggiorna il localStorage
      this.updateLocalStorage();
      console.log("Prodotto aggiunto con successo al carrello.");

      // Mostra il popup di successo
      this.showSuccessPopup = true;
      this.successMessage = `${product.name} è stato aggiunto al carrello!`;

      // Nascondi il popup automaticamente dopo 3 secondi
      setTimeout(() => {
        this.showSuccessPopup = false;
      }, 3000);
    },
    updateLocalStorage() {
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
    closePopup() {
      this.showPopup = false; // Chiude il popup di errore
    },
    closeSuccessPopup() {
      this.showSuccessPopup = false; // Chiude manualmente il popup di successo
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
  <main>
    <div class="container d-flex justify-content-around flex-wrap p-0">
      <!-- Dettagli del Ristorante -->
      <div v-if="restaurant" class="card mb-3">
        <img
          :src="`http://127.0.0.1:8000/storage/${restaurant.image}`"
          class="card-img-top"
          alt="Immagine del ristorante"
        />

        <div class="card-body">
          <h1 class="card-title">{{ restaurant.name }}</h1>
          <p class="card-text">{{ restaurant.description }}</p>
          <p class="card-text">
            <small class="text-body-secondary">
              <i class="fa-solid fa-location-dot"></i>
              Il ristorante si trova presso: {{ restaurant.address }}
            </small>
          </p>

          <!-- Sezione piatti -->
          <div class="dishes_container">
            <h3>Piatti</h3>

            <div
              class="dishes_cards_container d-flex flex-wrap justify-content-even"
            >
              <div
                v-for="product in restaurant.products"
                :key="product.id"
                v-show="product.visible !== 0"
              >
                <div class="card mb-3 me-4 card_product" style="width: 18rem;">
                  <img
                    :src="`http://127.0.0.1:8000/storage/${product.image}`"
                    class="card-img-top"
                    alt="Immagine del piatto"
                  />
                  <div class="card-body">
                    <h5 class="card-title">{{ product.name }}</h5>
                    <div class="fw-semibold">{{ product.price }}<span>€</span></div>
                    <p class="card-text">
                      <span class="fw-semibold text-decoration-underline"
                        >Ingredienti:</span
                      >
                      {{ product.ingredients }}
                    </p>
                  </div>

                  <!-- Bottone per aggiungere al carrello -->
                  <button
                    @click="AddToCart(product)"
                    class="btn btn-dark"
                  >
                    <i class="fa-solid fa-plus"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Messaggio di caricamento -->
      <div v-else>
        <p>Caricamento dei dati del ristorante...</p>
      </div>
    </div>

    <!-- Popup dinamico per errore -->
    <div v-if="showPopup" class="popup popup-error">
      <p>Puoi aggiungere solo prodotti dallo stesso ristorante!</p>
      <button @click="closePopup" class="btn btn-primary">Chiudi</button>
    </div>

    <!-- Popup dinamico per successo -->
    <div v-if="showSuccessPopup" class="popup popup-success">
      <p>{{ successMessage }}</p>
      <button @click="closeSuccessPopup" class="btn btn-success">OK</button>
    </div>
  </main>
</template>

<style lang="scss" scoped>
@use '../assets/scss/partials/variables' as *;

main {
  width: 100vw;
  padding: 100px;
  text-align: left;

  a {
    text-decoration: none;
    color: black;

    &:hover {
      color: $mainColor;
      opacity: 0.8;
    }
  }

  .card {
    width: 100%;
  }

  // Card del prodotto
  .card_product {
    height: 350px;

    .card-img-top {
      height: 150px;
    }
  }

  .card-title {
    font-family: "Chewy", system-ui;
    font-weight: 400;
    font-style: normal;
  }
  // 
  .btn-dark {
    background-color: $mainColor;
    border: none;
    border-radius: 0;

    &:hover {
      opacity: 0.8;
    }
  }
}

.cart {
  font-family: "Chewy", system-ui;
  font-weight: 400;
  font-style: normal;
}

// Pop up carrello
.popup {
  position: fixed;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  border-radius: 10px;
  z-index: 1000;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.popup-error {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.popup-success {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.popup button {
  margin-top: 10px;
}

// 
</style>