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
      <div class="row justify-content-around">

        <div class="col-xl-3 col-lg-2 col-sm-2 pt-2 ps-3">
          <!-- Footer contatti--> 
          <ul>
            <li><a href="#">
              <i class="fa-solid fa-comments pe-1"></i>Parla con noi</a></li>
            <li><a href="#"><i class="fa-solid fa-phone pe-1"></i>+39 1234672341</a></li>
            <li><a href="#"><i class="fa-solid fa-envelope pe-1"></i></a>deliveboo3@food.com</li>
          </ul>
        </div>

        <div class="col-xl-3 col-lg-2 col-sm-2 pt-2 ps-3">
          <!-- Footer info --> 
          <ul>
            <li><a href="#">Termini di utilizzo</a></li>
            <li><a href="#">Informativa sulla privacy</a></li>
            <li><a href="#">Contattaci</a></li>
          </ul>
        </div>

        <div class="col-xl-3 col-lg-2 col-sm-2 pt-2 ps-3">
          <!-- Footer info --> 
          <ul>
            <li><a href="#">La nostra azienda</a></li>
            <li><a href="#">Lavora con noi</a></li>
            <li><a href="#">Esperienze dei nostri clienti</a></li>
            <li><a href="#">Blog</a></li>
          </ul>
        </div>

        <!-- Socials -->
        <div class="col-xl-3 col-lg-2 col-sm-2 pt-2 ps-3">
          <div class="follow">
            Seguici sui social!
          </div>
            <a href="" class="pe-2">
              <i class="fa-brands fa-facebook"></i>
            </a>
            <a href="" class="pe-2">
              <i class="fa-brands fa-x-twitter"></i>
            </a>
            <a href="" class="pe-2">
              <i class="fa-brands fa-linkedin"></i>
            </a>
            <a href="" class="pe-2">
              <i class="fa-brands fa-instagram"></i>
            </a>
        </div>
      </div>

      
      <!-- Copyrights -->
      <div class="row justify-content-between align-items-center">
        <div class="col-xl-2 col-lg-2 col-sm-2 pt-2">
          <h2>
            <a href="">DeliveBoo</a>
          </h2>
        </div>
        <div class="col-xl-3 col-lg-2 col-sm-2 copyrights ps-3">
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

  height: 240px;
  background-color: $secondColor;
  color: white;

  a:hover {
    cursor: pointer;
    opacity: 0.8;
  }

  .container {

    padding: 30px;
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

.copyrights {
  font-size: small;
  opacity: 0.8;
}
</style>
