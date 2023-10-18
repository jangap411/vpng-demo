import bcrypt from "bcrypt";
import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

const User = sequelize.define(
  "User",
  {
    iduser: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    hooks: {
      beforeCreate: (user) => {
        if (user.password) {
          const salt = bcrypt.genSaltSync(10);
          user.password = bcrypt.hashSync(user.password, salt);
        }
      },
      beforeUpdate: (user) => {
        if (user.password) {
          const salt = bcrypt.genSaltSync(10);
          user.password = bcrypt.hashSync(user.password, salt);
        }
      },
    },
  }
);

export default User;
