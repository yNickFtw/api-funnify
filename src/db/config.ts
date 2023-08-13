import { Sequelize } from "sequelize";
require('dotenv').config();

const DB_URL = process.env.DB_URL || "";
const DB_NAME = process.env.DB_NAME || "";
const DB_USER = process.env.DB_USER || "";
const DB_PASS = process.env.DB_PASS || "";

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_URL,
  dialect: "mysql",
  dialectModule: require("mysql2"),
});

export default sequelize;