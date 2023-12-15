import Score from "../models/score.js";


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

export const updateScore = async (req, res) => {
    try {
        const score = await Score.update(req.body, {
            where: {
                userId: req.params.userId
            }
        });
        res.json({
            "message": "Score Updated",
            data: score
        });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

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

    