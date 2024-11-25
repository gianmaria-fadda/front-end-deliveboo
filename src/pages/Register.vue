<script>
export default {
  data() {
    return { 
      
    }
  }
}
</script>

<template>
  <div>
    <form action="">
          
      <!-- Email -->
      <div class="mb-3">
        <label for="EmailInput" class="form-label">Indirizzo Email  
          <span class="red_required">*</span> 
        </label>
        <input type="email" class="form-control" id="EmailInput" placeholder="" required min="5">
      </div>

      <!-- Nome attività -->
      <div class="input-group mb-3">
        <label for="NameInput" class="form-label">Nome della tua attività
          <span class="red_required">*</span>
        </label>
        <input type="text" class="form-control" id="NameInput" placeholder="" required min="2">
      </div>

      <!-- Indirizzo -->
      <div class="input-group mb-3">
        <label for="IndirizzoInput" class="form-label">Indirizzo
          <span class="red_required">*</span>
        </label>
        <input type="text" class="form-control" id="IndirizzoInput" placeholder="" required min="5">
      </div>

      <!-- Altre info -->
      <div class="input-group mb-3">
        <label for="PIVAInput" class="form-label">PIVA
          <span class="red_required">*</span>
        </label>
        <input type="text" class="form-control" id="PIVAInput" placeholder="" required min="11" max="11">
      </div>

      <!-- Tipologie -->

        <!-- da fare con il v for -->
        <input type="checkbox" class="btn-check" id="btn-check-4" checked autocomplete="off">
        <label class="btn" for="btn-check-4">Italiano</label>

        <input type="checkbox" class="btn-check" id="btn-check-5" autocomplete="off" required>
        <label class="btn" for="btn-check-5">Altro</label>

      
      <!-- Immagine -->
      <div class="input-group mb-3">
        <label class="input-group-text" for="inputGroupFile01">Upload</label>
        <input type="file" class="form-control" id="inputGroupFile01">
      </div>

        <!-- if selected aggiunge un text -->

      

      <!-- Password -->
      <div class="row g-3 align-items-center">
        <div class="col-auto">
          <label for="inputPassword6" class="col-form-label">Scegli password
            <span class="red_required">*</span>
          </label>
          <input type="password" id="inputPassword6" class="form-control" min="8">
        </div>
        <div class="col-auto">
          <span id="passwordHelpInline" class="form-text">
            La password eeve essere almeno di 8 caratteri.
          </span>
        </div>
      </div>

      <!-- Bottone -->
      <button type="submit" class="btn btn-primary">Registrati</button>

    </form>
  </div>
</template>

<style lang="scss" scoped>
@use '../assets/scss/partials/variables' as *;

</style>
