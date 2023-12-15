import Score from "../models/score.js";

/* Richiesta GET che restituisce tutti gli "score" di un determinato utente */

export const getScore = async (req, res) => {
    try {
        const score = await Score.findAll({
            where: {
                userId: req.params.userId
            }
        });
        
        if (score) {
            res.send(score);
        } else {
            res.sendStatus(404);
        }
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

/* Richiesta POST che aggiunge (crea) uno "score" */

export const addScore = async (req, res) => {
    try {
        const score = await Score.create(req.body);
        console.log(req.body)
        res.json({
            "message": "Score Created",
            data: score
        });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

/* Richiesta DELETE che elimina un determinato "score" */

export const deleteScore = async (req, res) => {
    try {
        await Score.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "Score Deleted"
        });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

/* Richiesta GET che genera la classifica delle dieci partite col punteggio più alto:
Ottiene l'elenco di tutti i punteggi e tramite gli attributi "limit" e "order" 
lo manipola limitando il numero di elementi a 10 e ordinando gli elementi in 
ordine decrescente di "score" 
*/

export const top10 = async (req, res) => {
    try {
        const score = await Score.findAll({
            limit: 10,
            order: [
                ["score", "DESC"]
              ]
        });

        if (score) {
            res.send(score);
        } else {
            res.sendStatus(404);
        }
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }}

    