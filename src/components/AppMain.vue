<script>
import { RouterView } from 'vue-router';

export default {
  data() {
    return { 
      
    }
  }
}
</script>

<template>
   <!-- route outlet -->
  <!-- component matched by the route will render here -->
   <div class="container-fluid">
    <div class="row">
      <div class="col">
        <router-view></router-view>
      </div>
    </div>
   </div>
</template>

<style lang="scss" scoped>
@use '../assets/scss/partials/variables' as *;

</style>
