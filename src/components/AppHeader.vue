<script>
export default {
  data() {
    return { 
      
    }
  }
}
</script>

<template>
  <header>

    <router-link :to="{ name:'home' }" class="nav-link">
      Pagina Iniziale
    </router-link>

    <router-link :to="{ name:'login' }" class="nav-link">
      Login
    </router-link>

    <router-link :to="{ name:'register' }" class="nav-link">
      Registrati
    </router-link>

    <router-link :to="{ name:'new-dish' }" class="nav-link">
      Aggiungi nuovo piatto
    </router-link>

  </header>
</template>

<style lang="scss" scoped>
@use '../assets/scss/partials/variables' as *;

</style>
