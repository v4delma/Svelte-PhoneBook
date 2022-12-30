<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  import { fade, scale } from 'svelte/transition';

  export let id;
  export let etunimi;
  export let sukunimi;
  export let numero;
  let modal = false;
  let uusiNumero = '';
  let uusiEtunimi = '';
  let uusiSukunimi = '';

  function poista() {
    if (
      window.confirm(
        'Are you sure that you want to delete user: ' +
          etunimi +
          ' ' +
          sukunimi +
          '?'
      )
    ) {
      dispatch('poista', { id, etunimi, sukunimi, numero });
    }
  }

  function paivita() {
    if ((uusiEtunimi === '' && uusiSukunimi === '', uusiNumero !== '')) {
      dispatch('paivita', {
        id: id,
        etunimi: etunimi,
        sukunimi: sukunimi,
        numero: uusiNumero,
      });
    }
    if (uusiNumero === '' && uusiEtunimi !== '' && uusiSukunimi !== '') {
      dispatch('paivita', {
        id: id,
        etunimi: uusiEtunimi,
        sukunimi: uusiSukunimi,
        numero: numero,
      });
    }
    if (uusiEtunimi !== '' && uusiNumero !== '' && uusiSukunimi !== '') {
      dispatch('paivita', {
        id: id,
        etunimi: uusiEtunimi,
        sukunimi: uusiSukunimi,
        numero: uusiNumero,
      });
    }
    if (uusiEtunimi !== '' && uusiNumero === '' && uusiSukunimi === '') {
      dispatch('paivita', {
        id: id,
        etunimi: uusiEtunimi,
        sukunimi: sukunimi,
        numero: numero,
      });
    }
    if (uusiEtunimi !== '' && uusiNumero != '' && uusiSukunimi === '') {
      dispatch('paivita', {
        id: id,
        etunimi: uusiEtunimi,
        sukunimi: sukunimi,
        numero: uusiNumero,
      });
    }
    if (uusiEtunimi === '' && uusiNumero != '' && uusiSukunimi !== '') {
      dispatch('paivita', {
        id: id,
        etunimi: etunimi,
        sukunimi: uusiSukunimi,
        numero: uusiNumero,
      });
    }
    if (uusiEtunimi === '' && uusiNumero == '' && uusiSukunimi !== '') {
      dispatch('paivita', {
        id: id,
        etunimi: etunimi,
        sukunimi: uusiSukunimi,
        numero: numero,
      });
    }
    modal = false;
    uusiEtunimi = '';
    uusiSukunimi = '';
    uusiNumero = '';
  }

  function paivitaUusiEtunimi(value) {
    console.log('value', value);
    uusiEtunimi = value;
  }

  function paivitaUusiSukunimi(value) {
    console.log('value', value);
    uusiSukunimi = value;
  }

  function paivitaUusiNumero(value) {
    console.log('value', value);
    uusiNumero = value;
  }

  function suljeModal() {
    modal = false;
    uusiEtunimi = '';
    uusiNumero = '';
    uusiSukunimi = '';
  }
</script>

<div class="resp-table-row">
  <div class="table-body-cell">{sukunimi}</div>
  <div class="table-body-cell">{etunimi}</div>
  <div class="table-body-cell">{numero}</div>
  <div class="table-body-cell">
    <span
      title="Edit"
      type="button"
      class="material-symbols-outlined"
      on:keypress={() => (modal = true)}
      on:click={() => (modal = true)}
    >
      edit
    </span>
  </div>
  <div class="table-body-cell">
    <span
      title="Delete"
      type="button"
      class="material-symbols-outlined"
      on:keypress={poista}
      on:click={poista}
    >
      delete
    </span>
  </div>
</div>

{#if modal}
  <div class="modal" id="modal" tabindex="-1" transition:fade>
    <div class="modal-dialog modal-dialog-centered modal-sm" transition:scale>
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5">Edit contact details</h1>
          <button
            type="button"
            class="btn-close"
            on:click={() => (modal = false)}
          />
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-2">
              <label
                >Firstname
                <input
                  class="form-control"
                  value={etunimi}
                  on:change={(e) => paivitaUusiEtunimi(e.target.value)}
                /></label
              >
            </div>
            <div class="mb-2">
              <label
                >Lastname
                <input
                  class="form-control"
                  value={sukunimi}
                  on:change={(e) => paivitaUusiSukunimi(e.target.value)}
                /></label
              >
            </div>
            <div class="mb-2">
              <label
                >Number
                <input
                  class="form-control"
                  value={numero}
                  on:change={(e) => paivitaUusiNumero(e.target.value)}
                /></label
              >
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" on:click={suljeModal}
            >Close</button
          >
          <button type="button" class="btn btn-primary" on:click={paivita}
            >Save</button
          >
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  .modal {
    display: block;
    background-color: rgba(128, 128, 128, 0.586);
  }

  .resp-table-row {
    display: table-row;
    background-color: rgb(245, 245, 245);
  }

  .table-body-cell {
    display: table-cell;
    padding: 5px;
    border-bottom: 0.5px solid lightgrey;
  }

  input {
    width: 100%;
  }
</style>
