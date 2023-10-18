import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

const Sim = sequelize.define(
  "Sim",
  {
    idsims: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
  },
  { timestamps: false }
);

export default Sim;
