const path = require('path');

async function runAll() {
  console.log('Running shareit tests...');
  // require relative to this file
  const domainTests = require(path.join(__dirname, 'items.domain.test'));
  await domainTests.run();
  const routeTests = require(path.join(__dirname, 'items.route.test'));
  await routeTests.run();
  console.log('All tests OK');
}

if (require.main === module) {
  runAll().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}

module.exports = { runAll };
