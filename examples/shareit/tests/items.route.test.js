const assert = require('assert');
const http = require('http');

async function run() {
  const app = require('../server/app');

  // start server on ephemeral port
  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, resolve));
  const { port } = server.address();
  const base = `http://localhost:${port}`;

  // Helper for fetch
  const fetch = globalThis.fetch || ((url, opts) => import('node-fetch').then(({default: f}) => f(url, opts)));

  // Ensure item 1 is available initially (based on seeded repo)
  let res = await fetch(`${base}/api/items/1`);
  if (res.status === 200) {
    // GET /api/items/1 is not implemented; the API exposes list at /api/items
  }

  // Borrow item 1
  res = await fetch(`${base}/api/items/1/borrow`, { method: 'POST' });
  assert.strictEqual(res.status, 200, 'borrow should return 200 on first borrow');
  let body = await res.json();
  assert.strictEqual(body.availability, 'borrowed');

  // Borrow again -> should be 409
  res = await fetch(`${base}/api/items/1/borrow`, { method: 'POST' });
  assert.strictEqual(res.status, 409, 'second borrow should return 409');

  // Return item 1
  res = await fetch(`${base}/api/items/1/return`, { method: 'POST' });
  assert.strictEqual(res.status, 200, 'return should return 200');
  body = await res.json();
  assert.strictEqual(body.availability, 'available');

  // Return again -> 409
  res = await fetch(`${base}/api/items/1/return`, { method: 'POST' });
  assert.strictEqual(res.status, 409, 'second return should return 409');

  // Non-existent item -> 404
  res = await fetch(`${base}/api/items/9999/borrow`, { method: 'POST' });
  assert.strictEqual(res.status, 404, 'borrow non-existent should return 404');

  server.close();
  console.log('items.route tests passed');
}

if (require.main === module) {
  run().catch((err) => {
    console.error('Route tests failed:', err);
    process.exit(1);
  });
}

module.exports = { run };
