<script>
  export let item;
  function fallback(value, defaultValue) {
    return value ?? defaultValue;
  }
  const lastUsed = fallback(item.lastUsed, "Never");
  const lastUser = fallback(item.lastUser, "N/A");
</script>

<div class="catalog-item flex items-center gap-4 p-4 bg-gray-50 rounded-lg shadow-sm">
  <img src={item.image} alt={item.name} class="w-16 h-16 rounded-lg object-cover border border-gray-200" />
  <div class="flex flex-col justify-center">
    <div class="font-semibold text-lg text-gray-800">{item.name}</div>
    <div class="text-xs text-gray-500 mt-1">Last used: <span class="font-medium">{lastUsed}</span></div>
      <div class="text-xs text-gray-500">By: <span class="font-medium">{lastUser}</span></div>
  </div>
</div>
