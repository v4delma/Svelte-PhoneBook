<script>
  import axios from 'axios';
  import { onMount } from 'svelte';
  import Add from './Add.svelte';
  import Contact from './Contact.svelte';
  import Notification from './Notification.svelte';

  let kontaktit = [];
  $: sortatutKontaktit = kontaktit
    .sort((a, b) => a.sukunimi.localeCompare(b.sukunimi))
    .filter(
      (kontakti) =>
        kontakti.sukunimi.toUpperCase().includes(inputEtsi.toUpperCase()) ||
        kontakti.etunimi.toUpperCase().includes(inputEtsi.toUpperCase())
    );

  let inputEtsi = '';
  let addModal = false;
  let addNotification = false;
  let editNotification = false;
  let deleteNotification = false;
  let muokattuKontakti = {};
  let lisattyKontakti = {};
  let poistettuKontakti = {};

  const haeKontaktit = async () => {
    const request = await axios.get('http://localhost:3001/api/kontaktit');
    kontaktit = request.data;
    console.log('App.svelte kontaktit', kontaktit);
    console.log('haeKontaktit', request);
  };

  const lisaaKontakti = async (ce) => {
    console.log(ce.detail);
    const data = ce.detail;
    const response = await axios.post(
      'http://localhost:3001/api/kontaktit',
      data
    );
    console.log('lisaaKontakti', response.data);
    addModal = false;
    lisattyKontakti = ce.detail;
    addNotification = true;
    setTimeout(() => {
      addNotification = false;
      lisattyKontakti = {};
    }, 3000);
    haeKontaktit();
  };

  const poistaKontakti = async (ce) => {
    console.log(ce.detail);
    const id = ce.detail.id;
    const response = await axios.delete(
      `http://localhost:3001/api/kontaktit/${id}`
    );
    poistettuKontakti = ce.detail;
    deleteNotification = true;
    setTimeout(() => {
      deleteNotification = false;
      poistettuKontakti = {};
    }, 3000);
    haeKontaktit();
    console.log('poistaKontakti', response);
  };

  const paivitaKontakti = async (ce) => {
    console.log(ce.detail);
    const data = ce.detail;
    const response = await axios.put(
      `http://localhost:3001/api/kontaktit/${data.id}`,
      { data }
    );
    muokattuKontakti = ce.detail;
    editNotification = true;
    setTimeout(() => {
      editNotification = false;
      muokattuKontakti = {};
    }, 3000);
    haeKontaktit();
    console.log('paivitaKontakti', response);
  };

  function suljeModal() {
    addModal = false;
    addNotification = false;
    editNotification = false;
    deleteNotification = false;
  }

  onMount(haeKontaktit);
</script>

<div class="container">
  <nav>
    <div class="header mb-2">
      <h3>Contacts</h3>
      <button
        title="Add a new contact"
        type="button"
        class="btn btn-primary btn-lg"
        on:click={() => (addModal = true)}>+ Add Contact</button
      >
    </div>
    <div class="search">
      <span class="material-symbols-outlined"> search </span>
      <input
        title="Search for a contact by name"
        class="search-input"
        type="search"
        placeholder="Search for contact by name..."
        aria-label="Search"
        bind:value={inputEtsi}
      />
    </div>
  </nav>

  <div>
    {#if kontaktit.length < 1}
      Ei vielä yhtään kontaktia...
    {:else}
      <div id="resp-table">
        <div id="resp-table-header">
          <div class="table-header-cell">Lastname</div>
          <div class="table-header-cell">Firstname</div>
          <div class="table-header-cell">Phone number</div>
          <div class="table-header-cell">Edit</div>
          <div class="table-header-cell">Delete</div>
        </div>
        <div id="resp-table-body">
          {#each sortatutKontaktit as contact (contact.id)}
            <Contact
              etunimi={contact.etunimi}
              sukunimi={contact.sukunimi}
              numero={contact.numero}
              id={contact.id}
              on:poista={poistaKontakti}
              on:paivita={paivitaKontakti}
            />
          {/each}
        </div>
      </div>
    {/if}
  </div>

  {#if addModal}
    <div class="add">
      <Add on:lisaa={lisaaKontakti} on:sulje={suljeModal} />
    </div>
  {/if}

  {#if addNotification}
    <div>
      <Notification on:sulje={suljeModal}
        ><span slot="header">A new contact added!</span>
        <span slot="body"
          ><p>{lisattyKontakti.etunimi}</p>
          <p>{lisattyKontakti.sukunimi}</p>
          <p>{lisattyKontakti.numero}</p></span
        >
      </Notification>
    </div>
  {/if}

  {#if editNotification}
    <div>
      <Notification on:sulje={suljeModal}>
        <span slot="header">Contact details changed!</span>
        <span slot="body"
          ><p>{muokattuKontakti.etunimi}</p>
          <p>{muokattuKontakti.sukunimi}</p>
          <p>{muokattuKontakti.numero}</p></span
        >
      </Notification>
    </div>
  {/if}

  {#if deleteNotification}
    <div>
      <Notification on:sulje={suljeModal}>
        <span slot="header">Contact deleted!</span>
        <span slot="body"
          ><p>{poistettuKontakti.etunimi}</p>
          <p>{poistettuKontakti.sukunimi}</p>
          <p>{poistettuKontakti.numero}</p></span
        >
      </Notification>
    </div>
  {/if}
</div>

<style>
  .container {
    max-width: 800px;
    padding: 0px;
  }

  nav {
    background-color: rgb(80, 80, 80);
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    margin-bottom: 5px;
  }

  .header {
    display: flex;
    flex-basis: 100%;
    justify-content: space-between;
    align-items: center;
  }

  nav > div > h3 {
    color: white;
  }

  .search {
    display: flex;
    flex-basis: 100%;
    background-color: white;
    align-items: center;
  }

  .search-input {
    width: 100%;
    border: 0px;
  }

  #resp-table {
    width: 100%;
    display: table;
  }

  #resp-table-header {
    display: table-header-group;
    background-color: lightgray;
    font-weight: bold;
    font-size: 0.75rem;
    position: sticky;
    top: 0;
  }

  .table-header-cell {
    display: table-cell;
    padding: 5px;
    text-align: justify;
    border-bottom: 1px solid black;
  }

  #resp-table-body {
    display: table-row-group;
  }
</style>
