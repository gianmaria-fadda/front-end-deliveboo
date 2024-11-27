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
      arrayCategories: []
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

      // Se c'è un'immagine, aggiungila al formData
      if (this.form.image) {
        formData.append('image', this.form.image);
      }

      // Esegui la richiesta POST per registrare l'utente e il ristorante
      axios.post('http://127.0.0.1:8000/api/register', formData)
        .then(response => {
          console.log('Registrazione completata:', response.data);
          // Puoi reindirizzare l'utente o fare altre azioni
        })
        .catch(error => {
          console.error('Errore durante la registrazione:', error);
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
  <div>

    <!-- aggiungere i campi contrassegnati bla bla bla -->
    <form @submit.prevent="submitForm">

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
          <label for="inputPassword6" class="col-form-label">Scegli password
            <span class="red_required">*</span>
          </label>
          <input type="password" v-model="form.password" id="inputPassword6" placeholder="Inserisci qui la tua Password..." class="form-control" min="8">
        </div>
        <div class="col-auto margin-top-password">
          <span id="passwordHelpInline" class="form-text">
            La password deve essere almeno di 8 caratteri.
          </span>
        </div>
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

        <!-- da fare con il v for -->
        <input type="checkbox" class="btn-check" id="btn-check-4" checked autocomplete="off">
        <label class="btn" for="btn-check-4">Italiano</label>

        <input type="checkbox" class="btn-check" id="btn-check-5" autocomplete="off" required>
        <label class="btn" for="btn-check-5">Altro</label>

      
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
</template>

<style lang="scss" scoped>
@use '../../assets/scss/partials/variables.scss' as *;

* {
  overflow: hidden;
}

.margin-top-password {
  margin-top: 70px;
}

</style>
