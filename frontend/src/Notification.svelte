<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  import { fade, scale } from 'svelte/transition';

  function suljeModal() {
    dispatch('sulje');
  }
</script>

<div class="modal" id="modal" tabindex="-1" transition:fade>
  <div class="modal-dialog modal-dialog-centered modal-sm" transition:scale>
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5"><slot name="header" /></h1>
        <button type="button" class="btn-close" on:click={suljeModal} />
      </div>
      <div class="modal-body">
        <slot name="body" />
      </div>
      <div class="modal-footer" />
    </div>
  </div>
</div>

<style>
  .modal {
    display: block;
    background-color: rgba(128, 128, 128, 0.586);
  }
</style>
