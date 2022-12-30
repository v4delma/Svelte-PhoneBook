<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  import { fade, scale } from 'svelte/transition';

  let etunimi = '';
  let numero = '';
  let sukunimi = '';

  function containsOnlyNumbers(str) {
    return /^\d+$/.test(str);
  }

  $: etunimiValid = etunimi.trim().length >= 3;
  $: sukunimiValid = sukunimi.trim().length >= 3;
  $: numeroLkmValid = numero.trim().length >= 5;
  $: numeroValid = numeroLkmValid && containsOnlyNumbers(numero);
  $: formValid = etunimiValid && sukunimiValid && numeroValid;

  let errMsgNimi = 'Vähintään kolme merkkiä';
  let errMsgNum = 'Vähintään viisi numeroa';

  let etunimiVisited = false;
  let sukunimiVisited = false;
  let numeroVisited = false;

  function lisaa() {
    dispatch('lisaa', { etunimi: etunimi, sukunimi: sukunimi, numero: numero });
    etunimi = '';
    sukunimi = '';
    numero = '';
    etunimiVisited = false;
    sukunimiVisited = false;
    numeroVisited = false;
  }

  function suljeModal() {
    dispatch('sulje');
  }
</script>

<div class="modal" id="modal" tabindex="-1" transition:fade>
  <div class="modal-dialog modal-dialog-centered modal-sm" transition:scale>
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5">Add a new contact</h1>
        <button type="button" class="btn-close" on:click={suljeModal} />
      </div>
      <div class="modal-body">
        <form>
          <div class="mb-2">
            <label
              >Firstname<input
                class:errorField={!etunimiValid && etunimiVisited}
                type="text"
                class="form-control"
                bind:value={etunimi}
                on:blur={() => (etunimiVisited = true)}
                placeholder="Firstname"
              /></label
            >
            {#if !etunimiValid && etunimiVisited}
              <p class="errorMsg">{errMsgNimi}</p>
            {/if}
          </div>
          <div class="mb-2">
            <label
              >Lastname<input
                class:errorField={!sukunimiValid && sukunimiVisited}
                type="text"
                class="form-control"
                bind:value={sukunimi}
                on:blur={() => (sukunimiVisited = true)}
                placeholder="Lastname"
              /></label
            >
            {#if !sukunimiValid && sukunimiVisited}
              <p class="errorMsg">{errMsgNimi}</p>
            {/if}
          </div>
          <div class="mb-2">
            <label
              >Number<input
                class:errorField={!numeroValid && numeroVisited}
                type="text"
                class="form-control"
                bind:value={numero}
                on:blur={() => (numeroVisited = true)}
                placeholder="Number"
              /></label
            >
            {#if !numeroValid && numeroVisited}
              <p class="errorMsg">{errMsgNum}</p>
            {/if}
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" on:click={suljeModal}
          >Close</button
        >
        <button
          type="submit"
          class="btn btn-primary"
          on:click={lisaa}
          disabled={!formValid}>Save</button
        >
      </div>
    </div>
  </div>
</div>

<style>
  .modal {
    display: block;
    background-color: rgba(128, 128, 128, 0.586);
  }

  .errorMsg {
    font-size: 0.75rem;
    color: red;
    text-align: left;
    margin: 0px;
  }

  .errorField {
    border: 1px solid red;
  }

  input {
    width: 100%;
  }
</style>
