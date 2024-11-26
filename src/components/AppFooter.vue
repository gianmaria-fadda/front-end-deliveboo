<script>
export default {
  data() {
    return { 
      
    }
  }
}
</script>

<template>
  <footer>
    <div class="container">
      <div class="row justify-content-between align-items-center">
        <div class="col-xl-2 col-lg-2 col-sm-2 ">
          <h2>
            DeliveBoo
          </h2>
        </div>
        <div class="col-xl-2 col-lg-2 col-sm-2">
          <i class="fa-regular fa-copyright text-light"></i>
          <span>
            2024 Deliveroo
          </span>
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
@use '../assets/scss/partials/variables' as *;

footer {

  background-color: black;

  .container {

    .row {

      height: 50px;
      .col-xl-2 > *{

        color: white;
        opacity: 0.8;
        text-align: center;
        
        &:hover {

          cursor: pointer;
          opacity: 1;
        }
      }
    }
  }  
}
</style>
