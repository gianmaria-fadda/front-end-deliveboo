<script>
import axios from "axios";

export default {
  data() {
    return {
      restaurants: [],
      categories: [],
      selectedCategories: [],
      searchQuery: "",
    };
  },
  mounted() {
    this.getRestaurants();
    this.getCategories();
  },
  methods: {
    async getRestaurants() {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/public/restaurants");
        this.restaurants = res.data;
        console.log("Ristoranti recuperati:", res.data);
      } catch (error) {
        console.error("Errore nel recupero dei ristoranti:", error);
        alert("Impossibile recuperare i dati dei ristoranti.");
      }
    },
    async getCategories() {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/public/restaurant-categories");
        this.categories = res.data;
        console.log("Categorie recuperate:", res.data);
      } catch (error) {
        console.error("Errore nel recupero delle categorie:", error);
        alert("Impossibile recuperare i dati delle categorie.");
      }
    },
  },
  computed: {
    filteredRestaurants() {
      return this.restaurants.filter((restaurant) => {
        const normalizedName = restaurant.name.toLowerCase().replace(/\s+/g, ""); // Modificato
        const normalizedQuery = this.searchQuery.toLowerCase().replace(/\s+/g, "");
        const matchesSearchQuery = normalizedName.includes(normalizedQuery);

        const matchesCategory =
          this.selectedCategories.length === 0 ||
          this.selectedCategories.every((selectedCategory) =>
            restaurant.categories.some((category) => category.id === selectedCategory)
          );

        return matchesSearchQuery && matchesCategory;
      });
    },
  },
};
</script>

<template>
  <div>
    <div class="container-fluid px-3">
      
      <div class="d-flex flex-wrap">
        <!-- Barra di ricerca -->
        <div class="row my-3">
          <div class="col col-md-8 col-lg-6 mx-auto">
            <div class="input-group">
              <input
                type="text"
                class="form-control"
                placeholder="Cerca un ristorante..."
                v-model="searchQuery"
              />
              <span class="input-group-text">
                <i class="fa-solid fa-magnifying-glass"></i>
              </span>
            </div>
          </div>

          <!-- Checkbox delle categorie -->
          <div class="col-md-8 col-lg-6 mx-auto d-flex flex-wrap justify-content-start fw-6 mb-2">

            <h6 class="pe-4 pt-sm-3 fw-semibold">Categorie:</h6>

            <div v-for="category in categories" :key="category.id" class="form-check pt-sm-3 me-3 fs-6">
              <input
                type="checkbox"
                class="form-check-input"
                :id="category.id"
                :value="category.id"
                v-model="selectedCategories"
                @change="() => console.log('Categorie selezionate:', selectedCategories)"
              />
              <label class="form-check-label" :for="category.id">{{ category.name }}</label>
            </div>
          </div>
        </div>
      </div>


      <!-- Cards ristoranti -->
      <div v-if="filteredRestaurants.length > 0" class="container-fluid mt-3">
        <div class="row">
          <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-3" v-for="(restaurant) in filteredRestaurants" :key="restaurant.id">
            <div class="card h-100 card_restaurant">
              <img
                :src="`http://127.0.0.1:8000/storage/${restaurant.image}`"
                class="card-img-top"
                :alt="restaurant.restaurant_name"
              />

              <div class="card-body">
                <router-link :to="{ name:'restaurant', params: { id: restaurant.id } }">
                  <h5 class="card-title">{{ restaurant.name}}</h5>
                </router-link>
                <p class="card-text">{{ restaurant.description}}</p>
                <ul class="d-flex">
                  <li v-for="category in restaurant.categories" :key="category.id" class="fst-italic pe-5 categories">
                    {{ category.name }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <p class="text-center">Nessun ristorante trovato</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '../assets/scss/partials/variables' as *;

.container-fluid {
  padding: 15px;
}

a {
  text-decoration: none;
  color: black;

  &:hover {
    color: $mainColor;
    opacity: 0.8;
  }
}

.card_restaurant {
  height: 350px;

  .card-img-top {
    height: 180px;
  }
}

.card-title {
  font-family: "Chewy", system-ui;
  font-weight: 400;
  font-style: normal;
}

.card {
  display: flex;
  flex-direction: column;
}

// Colore delle checkbox

.form-check-input:checked {
  background-color: $mainColor; /* Cambia colore */
  border-color: $mainColor;    /* Cambia il bordo */
  box-shadow: none;
}

.form-check-input:focus {
  box-shadow: 0 0 0 0.25rem rgba($mainColor, 0.25); /* Arancione con trasparenza */
}

.form-control:focus {
  box-shadow: 0 0 0 0.25rem rgba($mainColor, 0.25); 
}

ul {
  list-style: url('https://img.icons8.com/fluency-systems-filled/15/food-bar.png');
}

.categories {
  font-size: small;
}
</style>
