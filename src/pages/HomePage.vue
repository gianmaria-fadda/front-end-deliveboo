<script>
import axios from 'axios';
import Restaurant from './Restaurant.vue';

export default {
  data() {
    return { 
      restaurants: []
    }
  },
  mounted() {
    this.getRestaurants();
  },
  methods: {
    getRestaurants() {
    axios
        .get('http://127.0.0.1:8000/api/public/restaurants')
        .then((res) => {
            console.log(res.data); 
            this.restaurants= res.data;
        });
    }
  }
}
</script>

<template>
  <div>
    <div class="container d-flex justify-content-around flex-wrap">
      
      <!-- Cards ristoranti -->
      <div class="card mb-3" style="width: 18rem;" v-for="(restaurant,i) in restaurants" key="restaurant.id">
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
