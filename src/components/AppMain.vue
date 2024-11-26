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
    <div class="row p-0">
      <div class="col p-0">
        <router-view></router-view>
      </div>
    </div>
   </div>
</template>

<style lang="scss" scoped>
@use '../assets/scss/partials/variables' as *;

</style>
