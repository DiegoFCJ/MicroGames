import { Sequelize } from "sequelize"; 
import db from "../../config/config.js";
 
const { DataTypes } = Sequelize;

const Ranking = db.define('ranking', {
  userId: {
    type: DataTypes.INTEGER
  },
  gamePoints: {
    type: DataTypes.INTEGER
  }
}, {
  freezeTableName: true
});
 
export default Ranking;