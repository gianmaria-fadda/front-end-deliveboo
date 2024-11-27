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

          <RouterLink :to="{ name:'home' }">
            <div class="d-flex">
              <img src="../../public/img/logo-orange.png" alt="Deliveboo Logo" class="deliveboo_logo">
              <div class="logo_name">Deliveboo</div>
            </div>
          </RouterLink>

          
          <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
            <div class="offcanvas-header">
              <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Dashboard</h5>
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
                    <router-link :to="{ name:'login' }" class="nav-link">
                      Login
                    </router-link>
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="#">
                    <router-link :to="{ name:'register' }" class="nav-link">
                      Registrati
                    </router-link>
                  </a>
                </li>
              </ul>
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

  }
}

.deliveboo_logo {
  width: 70px;

}

</style>
