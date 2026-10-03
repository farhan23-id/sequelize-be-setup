require("dotenv").config({ quiet: true });

const app = require("./app");
const { sequelize } = require("./models");

const PORT = process.env.SERVER_PORT || 3000;

const start = async () => {
  await sequelize.authenticate();

  console.log("Database connected");

  app.listen(PORT, () => {
    console.log(
      `Server running on http://localhost:${PORT}`
    );
  });
};

start().catch(console.error);