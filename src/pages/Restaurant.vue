<script>
import axios from 'axios';
import { RouterLink, RouterView } from 'vue-router';

export default {
  data() {
    return { 
      restaurant: {},
      cart: JSON.parse(localStorage.getItem('cart')) || []
    }
  },
  // Variabile per salvare l'id
  mounted() {
    const restaurantId = this.$route.params.id; 
    this.getSingleRestaurant(restaurantId);
  },
  methods: {
    getSingleRestaurant(id) {
      axios
      // Metto il parametro ID nella rotta
      .get(`http://127.0.0.1:8000/api/public/restaurant/${id}`) 
      .then((res) => {
          console.log(res.data); 
          this.restaurant= res.data;
      });
    },
    AddToCart(product) {// Se il carrello è vuoto, aggiungi l'ID del ristorante
      if (this.cart.length === 0) {
        this.cart.push({
          restaurantId: this.restaurant.id,  // Memorizza l'ID del ristorante
          items: []  // Lista degli articoli
        });
      }

      // Controlla che l'ID del ristorante del prodotto sia lo stesso di quello nel carrello
      const cartRestaurantId = this.cart[0].restaurantId;

      if (this.restaurant.id !== cartRestaurantId) {
        alert('Puoi aggiungere solo prodotti dallo stesso ristorante!');
        return;  // Impedisce l'aggiunta se l'ID ristorante non corrisponde
      }

      // Trova il prodotto nel carrello
      const existingProduct = this.cart[0].items.find(cartItem => cartItem.id === product.id);
      if (existingProduct) {
      // Se esiste, aumenta la quantità
      existingProduct.quantity++;
      } else {
      // Altrimenti, aggiungi il prodotto con quantità 1
      this.cart.push({
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1
      })
      };
      this.updateLocalStorage();
    },
  CartTotal() {
    return this.cart.reduce((total, item) => {
      return total + item.price * item.quantity; // Moltiplica il prezzo per la quantità di ciascun articolo e somma
    }, 0);
  },
  updateLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }
  }
}
</script>

<template>
  <main>
    <div class="container d-flex justify-content-around flex-wrap p-0">
      
      <!-- Ristorante -->
      <div class="card mb-3">
       <img :src="`http://127.0.0.1:8000/storage/${restaurant.image}`" class="card-img-top" alt="...">


        <div class="card-body">
          <h1 class="card-title">{{ restaurant.name}}</h1>
          <p class="card-text">{{ restaurant.description}}</p>
          <p class="card-text"><small class="text-body-secondary">
            <i class="fa-solid fa-location-dot"></i>
             Il ristorante si trova presso: {{ restaurant.address}}
          </small></p>

          <!-- Container generale sezione piatti-->
          <div class="dishes_container">
            <h3>
              Piatti
            </h3>

            <!-- Container delle cards dei piatti -->
            <div class="dishes_cards_container d-flex flex-wrap justify-content-even">

              <div v-for="(product,i) in restaurant.products" key="product.id">
                <div v-show="product.visible !== 0">
                  <div class="card mb-3 me-4" style="width: 18rem;" >
                    <img :src="`http://127.0.0.1:8000/storage/${product.image}`" class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">{{ product.name}}</h5>
                      <div>
                        {{ product.price }}€
                      </div>
                      <p class="card-text">
                        <span class="fw-semibold text-decoration-underline">Ingredienti:</span>
                        {{ product.ingredients}}
                      </p>    
                    </div>
    
                    <!-- Bottone per aggiungere il piatto al carrello -->
                    <button @click="AddToCart(product)" class="btn btn-dark" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">
                      <i class="fa-solid fa-plus"></i>
                    </button>
                  </div>
                  
                  
                </div>
              </div>

              <!-- Carrello Offcanvas -->

            <div class="offcanvas offcanvas-end" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
              <div class="offcanvas-header">
                <h5 class="offcanvas-title cart" id="offcanvasWithBothOptionsLabel">Carrello</h5>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
              </div>
              <div class="offcanvas-body">
                <div v-for="item in cart" :key="item.id">
                  <p>
                    <ul>
                      <li>
                        {{ item.name }} <br> - Quantità: {{ item.quantity }} <br> = Totale: €{{ (item.quantity * item.price).toFixed(2) }}
                      </li>
                    </ul>
                    
                  </p>
                </div>

                <div>
                  Il totale del tuo ordine è <span>&#8364;</span>{{ CartTotal() }}
                </div>

                <router-link :to="{ name:'cart' }" >
                  Vedi carrello
                </router-link>
              </div>
            </div>



            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
@use '../assets/scss/partials/variables' as *;


main {
  width: 100vw;
  background-image: url(../../public/img/logo-white.png);
  background-repeat: repeat;
  background-position: center;
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
  .card-title {
    font-family: "Chewy", system-ui;
    font-weight: 400;
    font-style: normal;
  }

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

</style>
