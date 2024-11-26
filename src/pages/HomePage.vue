<script>
import axios from 'axios';

export default {
  data() {
    return { 
      
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
        });
    }
  }
}
</script>

<template>
  <header>
    Questa è la home page
  </header>
</template>

<style lang="scss" scoped>
@use '../assets/scss/partials/variables' as *;

</style>
