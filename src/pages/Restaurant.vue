<script>
import axios from 'axios';

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
      

      <!-- Ristorante -->
      <div class="card" style="width: 18rem;">
        <a href="">
          <img :src="restaurant.image" class="card-img-top" alt="...">
        </a>

        <div class="card-body">
          <h5 class="card-title">{{ restaurant.name}}</h5>
          <h6>{{ restaurant.name}}</h6>
          <p class="card-text">{{ restaurant.description}}</p>
        </div>
      </div>

    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '../assets/scss/partials/variables' as *;


a {
  text-decoration: none;
  color: black;

  &:hover {
    color: $mainColor;
    opacity: 0.8;
  }
}

</style>
