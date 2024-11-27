<script>
import axios from 'axios';

export default {
  data() {
    return {
      form: {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        restaurant_name: '',
        address: '',
        description: '',
        piva: '',
        image: null,
        categories: []
      },
      arrayCategories: [],
      passwordError: false
    };
  },
  methods: {
    // Funzione per gestire il caricamento dell'immagine
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.form.image = file;
      }
    },

    checkedPassword() {
      if (this.form.password != this.form.password_confirmation) {
        this.passwordError = true
        return;
      } 
      else {
        this.passwordError = false
      }
    },

    // Funzione per inviare i dati al backend
    submitForm() {
      // Crea un oggetto FormData per inviare i dati (inclusi file)
      const formData = new FormData();
      formData.append('name', this.form.name);
      formData.append('email', this.form.email);
      formData.append('password', this.form.password);
      formData.append('password_confirmation', this.form.password_confirmation);
      formData.append('restaurant_name', this.form.restaurant_name);
      formData.append('address', this.form.address);
      formData.append('description', this.form.description);
      formData.append('piva', this.form.piva);
      formData.append('categories', this.form.categories);

      // Se c'è un'immagine, aggiungila al formData
      if (this.form.image) {
        formData.append('image', this.form.image);
      }

      // Esegui la richiesta POST per registrare l'utente e il ristorante
      axios.post('http://127.0.0.1:8000/api/auth/register', formData)
        .then(response => {
          console.log('Registrazione completata:', response.data);
          // Puoi reindirizzare l'utente o fare altre azioni
        })
        .catch(error => {
          console.error('Errore durante la registrazione:', error.response.data);
          console.error('status: ', error.response.status);
        });
    },
  },
  created() {
    axios.get('http://127.0.0.1:8000/api/public/restaurant-categories')
        .then(res => {
          console.log(this.arrayCategories = res.data);
        });
  }
};
</script>

<template>
  <div class="big_container">
    <div class="card">
      <div class="card-header">
        Registrati
      </div>
      <div class="card-body">
        <!-- aggiungere i campi contrassegnati bla bla bla -->
        <form @submit.prevent="submitForm" method="post">

          <!-- Nome attività -->
          <div class="mb-3">
            <label for="UserNameImput" class="form-label">Nome Utente
              <span class="red_required">*</span>
            </label>
            <input type="text" v-model="form.name" class="form-control" id="UserNameImput" placeholder="Inserisci qui il tuo Nome Utente..." required min="2">
          </div>
              
          <!-- Email -->
          <div class="mb-3">
            <label for="EmailInput" class="form-label">Indirizzo Email  
              <span class="red_required">*</span> 
            </label>
            <input type="email" v-model="form.email" class="form-control" id="EmailInput" placeholder="Inserisci qui la tua Email..." required min="5">
          </div>

          <!-- Password -->
          <div class="row g-3 align-items-center mb-4">
            <div class="col-auto">
              <label for="inputPassword6" class="col-form-label">Scegli Password
                <span class="red_required">*</span>
              </label>
              <input type="password" v-model="form.password" id="inputPassword6" @input="checkedPassword" placeholder="Inserisci qui la tua Password..." class="form-control" min="8">
            </div>
            <div class="col-auto margin-top-password">
              <span id="passwordHelpInline" class="form-text">
                La password deve essere almeno di 8 caratteri.
              </span>
            </div>
          </div>

          <!-- Conferma-Password -->
          <div class="row g-3 align-items-center mb-4">
            <div class="col-auto">
              <label for="inputPassword6" class="col-form-label">Conferma Password
                <span class="red_required">*</span>
              </label>
              <input type="password" v-model="form.password_confirmation" id="inputPassword6Confirmation" @input="checkedPassword" placeholder="Inserisci qui la tua Password..." class="form-control" min="8">
            </div>
            <div class="col-auto margin-top-password">
              <span id="passwordHelpInline" class="form-text">
                La password deve essere almeno di 8 caratteri.
              </span>
            </div>
          </div>

          <div v-if="passwordError" class="error-message">
            errore: le password non coincidono!!!
          </div>

          <!-- Nome attività -->
          <div class="input-group mb-3">
            <label for="NameInput" class="form-label">Nome della tua attività
              <span class="red_required">*</span>
            </label>
            <input type="text" v-model="form.restaurant_name" class="form-control" id="NameInput" placeholder="Inserisci qui il Nome della tua attività..." required min="2">
          </div>

          <!-- Indirizzo -->
          <div class="input-group mb-3">
            <label for="IndirizzoInput" class="form-label">Indirizzo
              <span class="red_required">*</span>
            </label>
            <input type="text" v-model="form.address" class="form-control" id="IndirizzoInput" placeholder="Inserisci qui il tuo Indirizzo..." required min="5">
          </div>

          <!-- Altre info -->
          <div class="input-group mb-3">
            <label for="PIVAInput" class="form-label">PIVA
              <span class="red_required">*</span>
            </label>
            <input type="text" v-model="form.piva" class="form-control" id="PIVAInput" placeholder="Inserisci qui la tua Partita Iva..." required min="11" max="11">
          </div>

          <!-- Tipologie -->
          <div>
            <label for="categories" class="form-label">Seleziona le categorie del tuo ristorante
              <span class="red_required">*</span>
            </label>
            <div v-for="category in arrayCategories" :key="category.id" class="form-check me-3 mb-2">
              <input
                type="checkbox"
                class="form-check-input"
                :id="category.id"
                :value="category.id"
                v-model="form.categories"
              />
              <label class="form-check-label" :for="category.id">{{ category.name }}</label>
            </div>
          </div>


          <!-- Immagine -->
          <div class="input-group mb-3 mt-3">
            <label class="input-group-text" for="inputGroupFile01">Upload</label>
            <input type="file" @change="handleImageUpload" class="form-control" id="inputGroupFile01">
          </div>

          <!-- if selected aggiunge un text -->

          <div class="mb-3">
            <label for="description" class="form-label">Aggiungi una Descrizione</label>
            <textarea class="form-control" v-model="form.description" id="description" placeholder="Inserisci qui una Descrizione della tua Attività..." rows="3"></textarea>
          </div>

          <!-- Bottone -->
          <button type="submit" class="btn btn-primary">Registrati</button>

        </form>
      </div>
    </div>
    
  </div>
</template>

<style lang="scss" scoped>
@use '../../assets/scss/partials/variables.scss' as *;

* {
  overflow: hidden;
}

.margin-top-password {
  margin-top: 70px;
}

// Asterisco rosso
.red_required {
  color: red;
}

.big_container {
  padding-left: 100px;
  padding-right: 100px;
  padding-top: 50px;
  padding-bottom: 50px;
}

</style>
