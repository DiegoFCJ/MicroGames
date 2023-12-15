import { Sequelize } from "sequelize";

const db = new Sequelize({
  database: "rowordproj",
  username: "root",
  password: "1q2w3e4r5t",
  host: "localhost",
  port: 3306,
  dialect: "mysql",
});

export default db;
