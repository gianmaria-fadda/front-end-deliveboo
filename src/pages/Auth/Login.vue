<script>
export default {
  data() {
    return { 
      
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
        <form action="">

          <!-- Email -->
          <div class="mb-3">
            <label for="EmailInput" class="form-label">Indirizzo Email</label>
            <input type="email" class="form-control" id="EmailInput" placeholder="" required>
          </div>

          <!-- Password -->
          <div class="row g-3 align-items-center mb-4">
            <div class="col-auto">
              <label for="inputPassword6" class="col-form-label">Password</label>
              <input type="password" id="inputPassword6" class="form-control" aria-describedby="passwordHelpInline">
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
