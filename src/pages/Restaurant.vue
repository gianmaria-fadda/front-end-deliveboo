<script>
import axios from 'axios';

export default {
  data() {
    return { 
      restaurant: {}
    }
  },
  // Variabile per salvare l'id
  mounted() {
    const restaurantId = this.$route.params.id; 
    this.getSingleRestaurant(restaurantId);
  },
  methods: {
    getSingleRestaurant(id) {
    axios
    // Metto il parametro ID nella rotta
    .get(`http://127.0.0.1:8000/api/public/restaurant/${id}`) 
    .then((res) => {
        console.log(res.data); 
        this.restaurant= res.data;
    });
    }
  }
}
</script>

<template>
  <main>
    <div class="container d-flex justify-content-around flex-wrap p-0">
      
      <!-- Ristorante -->
      <div class="card mb-3">
        <a href="">
          <img :src="restaurant.image" class="card-img-top" alt="...">
        </a>

        <div class="card-body">
          <h1 class="card-title">{{ restaurant.name}}</h1>
          <p class="card-text">{{ restaurant.description}}</p>
          <p class="card-text"><small class="text-body-secondary">
            <i class="fa-solid fa-location-dot"></i>
             Il ristorante si trova presso: {{ restaurant.address}}
          </small></p>

          <!-- Container generale sezione piatti-->
          <div class="dishes_container">
            <h3>
              Piatti
            </h3>

            <!-- Container delle cards dei piatti -->
            <div class="dishes_cards_container d-flex flex-wrap justify-content-even">

              <div class="card mb-3 me-4" style="width: 18rem;" v-for="(product,i) in restaurant.products" key="product.id">
                <div class="card-body">
                  <h5 class="card-title">{{ product.name}}</h5>
                  <div>
                    {{ product.price }}€
                  </div>
                  <p class="card-text">
                    <span class="fw-semibold text-decoration-underline">Ingredienti:</span>
                    {{ product.ingredients}}
                  </p>    
                </div>

                <!-- Bottone per aggiungere il piatto al carrello -->
                <button type="button" class="btn btn-dark">
                  <i class="fa-solid fa-plus"></i>
                </button>

                <!-- Da aggiungere al click metti la quantità -->
                
              </div>

              <!-- Card con bottone per aggiungere al carrello i prodotti -->
              <div class="card mb-3 me-4" style="width: 18rem;">
                <div class="card-body">
                  <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop">
                    <i class="fa-solid fa-plus"></i>
                  </button>
                </div>
              </div>

              <!-- Off canvas a destra per aggiungere un piatto -->
              <div class="offcanvas offcanvas-end" data-bs-backdrop="static" tabindex="-1" id="staticBackdrop" aria-labelledby="staticBackdropLabel">
  
                <div class="offcanvas-header">
                  <h5 class="offcanvas-title" id="offcanvasExampleLabel">Aggiungi un nuovo piatto</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>

                <div class="offcanvas-body">
                  <form action="">
                    <!-- Nome piatto -->
                    <input class="form-control" list="datalistOptions" id="exampleDataList" placeholder="Scrivi il nome del piatto...">
                    <datalist id="datalistOptions">

                      <!-- ciclo -->
                      <option value="Pizza">Pizza</option>
                    </datalist>

                    <!-- Ingredienti/descrizione -->
                    <div class="mb-3">
                        <label for="exampleFormControlTextarea1" class="form-label">Scrivi gli ingredienti/la descrizione.
                            <span class="red_required">*</span>
                        </label>
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                    </div>

                    <!-- Prezzo -->
                    <label for="AddPrice" class="form-label">Scegli il Prezzo
                        <span class="red_required">*</span>
                    </label>
                    <input class="form-control" type="text" id="AddPrice" min="0.10" required>

                    <!-- Visiibilità -->
                    <label for="exampleRadios1" class="form-label">Visibile sul menù
                        <span class="red_required">*</span>
                    </label>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked>
                        <label class="form-check-label" for="exampleRadios1">
                            Sì
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2">
                        <label class="form-check-label" for="exampleRadios2">
                            No
                        </label>
                    </div>

                    <!-- Bottone -->
                    <button type="submit" class="btn btn-primary">Aggiungi</button>

                  </form> 
                </div>
   
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
@use '../assets/scss/partials/variables' as *;


main {
  width: 100vw;
  background-image: url(../../public/img/logo-white.png);
  background-repeat: repeat;
  background-position: center;
  padding: 100px;
  text-align: left;

  a {
    text-decoration: none;
    color: black;

    &:hover {
      color: $mainColor;
      opacity: 0.8;
    }
  }

  .card {
    width: 100%;
  }
  .card-title {
    font-family: "Chewy", system-ui;
    font-weight: 400;
    font-style: normal;
  }

  .btn-dark {
    background-color: $mainColor;
    border: none;
    border-radius: 0;

    &:hover {
      opacity: 0.8;
    }
  }
}

</style>
