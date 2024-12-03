<script>
import { RouterLink } from 'vue-router';

export default {
  data() {
    return { 
      
    }
  }
}
</script>

<template>
  <header>
    <div class="nav-margin">
      <nav class="navbar fixed-top" data-bs-theme="light">
        <div class="container-fluid mx-5 d-flex">

          <div class="d-flex">
            <RouterLink :to="{ name:'home' }">
              <img src="../../public/img/logo-orange.png" alt="Deliveboo Logo" class="deliveboo_logo">
            </RouterLink>
            <div class="logo_name d-none d-sm-none d-md-block d-lg-block">Deliveboo</div>
          </div>

          <div class="d-flex align-items-center">
            <router-link :to="{ name:'cart' }"  class="d-none d-sm-none d-md-block d-lg-block me-5 fs-5 border border-white border-2 rounded-pill px-3 py-1 bg-light cart-color">
              <i class="fa-solid fa-cart-shopping"></i>
            </router-link>

            <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
  
            <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
              <div class="offcanvas-header">
                <h4 class="offcanvas-title title_offcanvas" id="offcanvasNavbarLabel">Dashboard</h4>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
              </div>
  
              <div class="offcanvas-body">
                <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                  <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="#">
                      <router-link :to="{ name:'home' }" class="nav-link">
                        Pagina Iniziale
                      </router-link>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="#">
                      <router-link to="/orders" class="nav-link">I Tuoi Ordini</router-link>
                    </a>
                  </li>
                  <!-- Link carrello visibile solo su cellulare -->
                  <li class="nav-item d-none d-sm-block d-md-none">
                    <a class="nav-link active" aria-current="page" href="#">
                      <router-link to="/cart" class="nav-link">Carrello</router-link>
                    </a>
                  </li>
                  <hr>
                  <li class="nav-item">
                    <h5>
                      Sei un ristoratore?
                    </h5>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" aria-current="page" href="http://127.0.0.1:8000/login">
                      Login
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" aria-current="page" href="http://127.0.0.1:8000/register">
                      Register
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>

<style lang="scss" scoped>
@use '../assets/scss/partials/variables' as *;

header {
  background-color: $mainColor;
  
  .nav-margin {
    margin-bottom: 80px;
  }
}

// Bottone carrello
.cart-color {
  color: $mainColor;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
    transition: .5s ease;
  }
}
// 

.navbar {
  height: 80px;
  background-color: $mainColor;


  .logo_name {
    font-family: "Chewy", system-ui;
    font-weight: 400;
    font-style: normal;
    font-size: 2rem;
    text-align: left;
    color: white;
    text-decoration: none;
    padding-top: 10px;
    padding-left: 10px;

  }
}

.deliveboo_logo {
  width: 68px;
}

// hamburger navbar button
.navbar-toggler {
  border-color: white;
} 

.navbar-toggler-icon {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3E%3Cpath stroke='%23fff' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E");
}

.navbar-toggler:focus, .navbar-toggler:active {
  color: rgba($color: white, $alpha: 0.5);
}
// 

// Offcanvas dashboard
.title_offcanvas {
  font-family: "Chewy", system-ui;
  font-weight: 400;
  font-style: normal;
  font-size: 2rem;
}


h5 {
  font-family: "Chewy", system-ui;
  font-weight: 400;
  font-style: normal;
  text-decoration: underline;
}
// 
</style>
