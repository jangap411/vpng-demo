import { Sequelize } from "sequelize";
import * as dotenv from "dotenv";

dotenv.config();

console.log(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWD);

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
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
