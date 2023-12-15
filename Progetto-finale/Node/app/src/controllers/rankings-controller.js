import Ranking from "../models/ranking.js"

export const getRankingByUserId = async (req, res) => {
    try {
        const ranking = await Ranking.findOne({
            where: {
                userId: req.params.userId,
                }
        });
        
        if (ranking) {
            res.send(ranking);
        } else {
            res.sendStatus(404);
        }
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

export const createRanking = async (req, res) => {
    try {
        const ranking = await Ranking.create(req.body);
        console.log(req.body)
        res.json({
            "message": "Ranking Created",
            data: ranking
        });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

export const getRanking = async (req, res) => {
    try{
        const ranking = await Ranking.findAll();
        if (ranking) {
            res.send(ranking);
        } else {
            res.sendStatus(404);
        }
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}
