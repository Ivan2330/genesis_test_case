const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const app = require(path.join(__dirname, 'app'));
const { sequelize } = require(path.join(__dirname, 'config/database'));
require(path.join(__dirname, 'utils/scheduler'));

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established');

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Something went wrong while starting the app:', error);
  }
})();
