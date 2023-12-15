import { Sequelize } from "sequelize"; 
import db from "../../config/config.js";
 
const { DataTypes } = Sequelize;

/* Segue la definizione del modello/tabella e dei suoi attributi/colonne.
  Ogni istanza rappresenterà il punteggio "score" di una partita giocata da un giocatore "user"
 */
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