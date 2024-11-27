<script>
export default {
  data() {
    return { 
      form: {
        email: '',
        password: ''
      },
    }
  },
  methods: {
    submitForm() {
      // Crea un oggetto FormData per inviare i dati (inclusi file)
      const formData = new FormData();
      formData.append('email', this.form.email);
      formData.append('password', this.form.password);

      // Esegui la richiesta POST per registrare l'utente e il ristorante
      axios.post('http://127.0.0.1:8000/api/auth/login', formData)
        .then(response => {
          console.log('Registrazione completata:', response.data);
          // Puoi reindirizzare l'utente o fare altre azioni
        })
        .catch(error => {
          console.error('Errore durante la registrazione:', error.response.data);
          console.error('status: ', error.response.status);
        });
    }
  }
}
</script>

<template>
  <div class="big_container">
    <div class="card">
      <div class="card-header">
        Login
      </div>
      <div class="card-body">
        <form @submit.prevent="submitForm" method="post">

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
              <label for="inputPassword6" class="col-form-label">Password</label>
              <input type="password" v-model="form.password" id="inputPassword6" class="form-control" aria-describedby="passwordHelpInline" placeholder="Inserisci qui la tua Password..." min="8">
            </div>
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

.big_container {
  padding: 50px 100px;
}

</style>
