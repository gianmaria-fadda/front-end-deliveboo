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
    
    <h2>
        Aggiungi nuovo piatto +
    </h2>

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
</template>

<style lang="scss" scoped>
@use '../assets/scss/partials/variables' as *;

</style>
