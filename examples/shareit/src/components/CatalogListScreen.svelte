<script>
  import CatalogItem from './CatalogItem.svelte';
  import data from '../data/sample-catalog.json';
</script>

<div class="catalog-list max-w-md mx-auto mt-8 p-4 bg-white rounded shadow-md">
  <div class="flex flex-col gap-4">
    {#each data as item}
      <CatalogItem {item} />
    {/each}
  </div>
</div>
