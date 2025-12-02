import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

const App = {
  data() {
    return { items: [], loading: true, error: '', view: 'list', selectedId: null, actionError: '' };
  },
  async mounted() {
    window.addEventListener('hashchange', this.syncRoute);
    this.syncRoute();
    await this.load();
  },
  beforeUnmount() {
    window.removeEventListener('hashchange', this.syncRoute);
  },
  methods: {
    syncRoute() {
      const h = location.hash.replace(/^#/, '');
      if (h.startsWith('/item/')) {
        this.view = 'detail';
        this.selectedId = h.replace('/item/', '');
      } else {
        this.view = 'list';
        this.selectedId = null;
      }
    },
    navigateToItem(id) {
      location.hash = `/item/${id}`;
    },
    async load() {
      this.loading = true; this.error = '';
      try {
        const res = await fetch('/api/items');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        this.items = await res.json();
      } catch (e) {
        this.error = 'Failed to load items. Please retry.';
      } finally {
        this.loading = false;
      }
    },
    findItem(id) {
      return this.items.find(i => String(i.id) === String(id));
    },
    // optimistic update helper
    async performAction(id, action) {
      this.actionError = '';
      const item = this.findItem(id);
      if (!item) { this.actionError = 'Item not found locally.'; return; }

      const prev = { ...item };
      // optimistic state
      item.availability = action === 'borrow' ? 'unavailable' : 'available';

      try {
        const res = await fetch(`/api/items/${encodeURIComponent(id)}/${action}`, { method: 'POST' });
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body.message || `HTTP ${res.status}`);
        }
        const updated = await res.json();
        // reconcile with server response
        Object.assign(item, updated);
      } catch (e) {
        // rollback
        Object.assign(item, prev);
        this.actionError = e.message || 'Action failed';
      }
    }
  },
  computed: {
    selectedItem() {
      return this.selectedId ? this.findItem(this.selectedId) : null;
    }
  },
  template: `
    <div>
      <div v-if="view==='list'">
        <div v-if="error" class="text-red-600 mb-3">
          {{ error }} <button @click="load" class="underline">Retry</button>
        </div>
        <div v-if="loading" class="flex items-center gap-2 text-gray-500 mb-3">
          <svg class="animate-spin h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path></svg>
          <span>Loading items…</span>
        </div>
        <div v-else>
          <div v-if="items.length === 0" class="text-gray-500">No items yet. Add one to get started.</div>
          <ul v-else class="grid gap-3">
            <li v-for="it in items" :key="it.id" class="bg-white rounded shadow p-3 flex gap-3 items-center cursor-pointer hover:bg-gray-50" @click="navigateToItem(it.id)">
              <img :src="it.thumbnailUrl" alt="thumbnail" class="w-16 h-16 rounded object-cover bg-gray-100" />
              <div class="flex-1">
                <div class="font-medium">{{ it.name }}</div>
                <div>
                  <span :class="{
                    'inline-block text-xs px-2 py-0.5 rounded bg-emerald-100 text-emerald-800': it.availability==='available',
                    'inline-block text-xs px-2 py-0.5 rounded bg-gray-200 text-gray-700': it.availability!=='available'
                  }">{{ it.availability }}</span>
                </div>
              </div>
              <div class="text-sm text-gray-400">View</div>
            </li>
          </ul>
        </div>
      </div>

      <div v-else-if="view==='detail'">
        <div class="mb-3">
          <button @click="location.hash=''" class="underline">← Back to list</button>
        </div>
        <div v-if="!selectedItem" class="text-yellow-700">Item not found.</div>
        <div v-else class="bg-white rounded shadow p-4">
          <div class="flex gap-4">
            <img :src="selectedItem.thumbnailUrl" alt="thumbnail" class="w-32 h-32 rounded object-cover bg-gray-100" />
            <div class="flex-1">
              <h2 class="text-lg font-semibold">{{ selectedItem.name }}</h2>
              <p class="text-sm text-gray-600">{{ selectedItem.description }}</p>
              <div class="mt-3">
                <span :class="{
                  'inline-block text-xs px-2 py-0.5 rounded bg-emerald-100 text-emerald-800': selectedItem.availability==='available',
                  'inline-block text-xs px-2 py-0.5 rounded bg-gray-200 text-gray-700': selectedItem.availability!=='available'
                }">{{ selectedItem.availability }}</span>
              </div>
              <div class="mt-4 flex gap-2">
                <button v-if="selectedItem.availability==='available'" @click="performAction(selectedItem.id,'borrow')" class="px-3 py-1 bg-emerald-600 text-white rounded">Borrow</button>
                <button v-else @click="performAction(selectedItem.id,'return')" class="px-3 py-1 bg-gray-200 text-gray-800 rounded">Return</button>
              </div>
              <div v-if="actionError" class="text-red-600 mt-2">{{ actionError }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
};

createApp(App).mount('#list');