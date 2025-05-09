const mongoose = require('mongoose');
const config = require('./app/config');
const dataSource = require('./app/database/data-source');
const app = require('./app/app');

(async () => {
  try {
    await dataSource.initialize();
    console.log('✅ MySQL initialized');

    mongoose.set('strictQuery', false);

    await mongoose.connect(config.mongo.uri, {
      dbName: config.app.name,
    });
    console.log('✅ MongoDB connected');

    app.listen(config.app.port, () => console.log(`🚀 Server listening on ${config.app.port}`));
  } catch (err) {
    console.error('❌ Startup failure', err);
    process.exit(1);
  }
})();
