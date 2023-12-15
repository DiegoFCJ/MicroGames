import { Sequelize } from "sequelize"; 
import db from "../../config/config.js";
 
const { DataTypes } = Sequelize;

const Favourite = db.define('favourites', {
  userId: {
    unique: "fav",
    type: DataTypes.INTEGER
  },
  movieId: {
    unique: "fav",
    type: DataTypes.INTEGER
  }
}, {
  freezeTableName: true
});
 
export default Favourite;