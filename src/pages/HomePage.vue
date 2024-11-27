<script>
import axios from 'axios';
import Restaurant from './Restaurant.vue';

export default {
  data() {
    return { 
      restaurants: [],
      searchQuery: "" // Valore della barra di ricerca
    }
  },
  mounted() {
    this.getRestaurants();
  },
  methods: {
    async getRestaurants() {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/public/restaurants");
        this.restaurants = res.data; // Salva i dati nella proprietà restaurants
      } catch (error) {
        console.error("Errore nel recupero dei ristoranti:", error);
        alert("Impossibile recuperare i dati dei ristoranti.");
      }
    },
  },
    computed: {
    // Filtra i ristoranti in base al nome inserito nella barra di ricerca
    filteredRestaurants() {
  return this.restaurants.filter((restaurant) => {
    const normalizedName = restaurant.name.toLowerCase().replace(/\s+/g, ""); // Rimuove tutti gli spazi
    const normalizedQuery = this.searchQuery.toLowerCase().replace(/\s+/g, ""); // Rimuove tutti gli spazi
    return normalizedName.includes(normalizedQuery);
  });
}
}
}

</script>

<template>
  <div>
    <div class="container d-flex justify-content-around flex-wrap">
      <!-- Barra di ricerca -->
    <div class="container my-4">
      <input
        type="text"
        class="form-control"
        placeholder="Cerca un ristorante..."
        v-model="searchQuery"
      />
    </div>
      <!-- Cards ristoranti -->
      <div class="card mb-3" style="width: 18rem;" v-for="(restaurant) in filteredRestaurants" :key="restaurant.id">
        <router-link :to="{ name:'restaurant' , params: { id: restaurant.id }}">
          <img :src="restaurant.image" class="card-img-top" alt="...">
        </router-link>

        <div class="card-body">
          <router-link :to="{ name:'restaurant', params: { id: restaurant.id } }">
            <h5 class="card-title">{{ restaurant.name}}</h5>
          </router-link>
          <p class="card-text">{{ restaurant.description}}</p>
        </div>
      </div>

    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '../assets/scss/partials/variables' as *;

.container {
  padding: 80px;
}

a {
  text-decoration: none;
  color: black;

  &:hover {
    color: $mainColor;
    opacity: 0.8;
  }
}

.card-title {
  font-family: "Chewy", system-ui;
  font-weight: 400;
  font-style: normal;
}
</style>