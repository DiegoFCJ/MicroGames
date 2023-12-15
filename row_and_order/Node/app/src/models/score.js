import { Sequelize } from "sequelize"; 
import db from "../../config/config.js";
 
const { DataTypes } = Sequelize;

const Score = db.define('scores', {
  userId: {
    type: DataTypes.INTEGER
  },
  userName: {
    type: DataTypes.STRING
  },
  score: {
    type: DataTypes.INTEGER
  }
}, {
  freezeTableName: true
});
 
export default Score;