import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: 3306,
  }
);

try {
  sequelize
    .authenticate()
    .then(() => console.log("Authentication successful"))
    .catch((e) => console.error(`Error authenticating: ${e}`));
} catch (error) {
  console.log("Error connecting to the database");
  console.error(error);
}

export default sequelize;
