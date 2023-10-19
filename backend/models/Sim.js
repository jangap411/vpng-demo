import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";
import Customer from "./Customer.js";

const Sim = sequelize.define(
  "Sims",
  {
    idsims: {
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true,
    },
    number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    puk_1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    puk_2: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    serial_no: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    customer_idcustomer: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { timestamps: false, tableName: "Sims" }
);

Customer.hasMany(Sim, { foreignKey: "customer_idcustomer" });
Sim.belongsTo(Customer, { foreignKey: "customer_idcustomer" });

export default Sim;
