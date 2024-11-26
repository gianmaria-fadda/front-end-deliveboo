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
      <div class="row justify-content-between">

        <div class="col-xl-3 col-lg-2 col-sm-2 ">
          <!-- Footer info --> 
          <h5>Info</h5>
          <ul>
            <li><a href="#">Termini di utilizzo</a></li>
            <li><a href="#">Informativa sulla privacy</a></li>
            <li><a href="#">Contattaci</a></li>
          </ul>
        </div>

        <!-- Socials -->
        <div class="col-xl-3 col-lg-2 col-sm-2 pt-5">
          <div class="follow">
            Seguici sui social!
          </div>
            <a href="" class="pe-2">
              <i class="fa-brands fa-facebook"></i>
            </a>
            <a href="">
              <i class="fa-brands fa-x-twitter"></i>
            </a>
        </div>
      </div>
      <!-- Copyrights -->
      <div class="row justify-content-between align-items-center">
        <div class="col-xl-2 col-lg-2 col-sm-2 ">
          <h2>
            <a href="">DeliveBoo</a>
          </h2>
        </div>
        <div class="col-xl-2 col-lg-2 col-sm-2">
          <i class="fa-regular fa-copyright text-light"></i>
          <span>
            2024 DeliveBoo
          </span>
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
@use '../assets/scss/partials/variables' as *;

footer {

  height: 250px;
  background-color: $secondColor;
  color: white;

  a:hover {
    cursor: pointer;
    opacity: 0.8;
  }

  .container {

    padding: 40px;
    .row {


      .col-xl-2 > *{

        color: white;
        text-align: center;
        
        
      }
    }
  }  

}


h2 {

  a {
    font-family: "Chewy", system-ui;
    font-weight: 400;
    font-style: normal;
    font-size: 2rem;
  }


}


// Link

ul {
  list-style: none;
}

a {
  text-decoration: none;
  color: white;
}
</style>
