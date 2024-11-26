<script>
/* 
  Per importare ed utilizzare un componente dentro un altro devo SEMPRE seguire questi 3 passi:
  1) Importazione del componente
  2) Dichiarazione del componente
  3) Utilizzo del componente
*/
// 1) Importazione del componente
import AppHeader from './components/AppHeader.vue';
import AppMain from './components/AppMain.vue';
import AppFooter from './components/AppFooter.vue';
import axios from 'axios';

export default {
  data() {
    return { 
      
    }
  },
  // 2) Dichiarazione del componente
  components: {
    AppHeader,
    AppMain,
    AppFooter
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
  <div>
    <!-- 3) Utilizzo del componente -->
    <AppHeader />

    <AppMain />
    
    <AppFooter />
  </div>
</template>

<style lang="scss">
@use 'assets/scss/main' as *;
// Import all of Bootstrap's CSS
@import "bootstrap/scss/bootstrap";
</style>
