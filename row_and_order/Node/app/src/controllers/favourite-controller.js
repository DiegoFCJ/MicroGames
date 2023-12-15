import Favourite from "../models/Favourite.js";

export const getFavourites = async (req, res) => {
    try {
        const favourites = await Favourite.findAll({
            where: {
                userId: req.params.userId
            }
        });
        
        if (favourites) {
            res.send(favourites);
        } else {
            res.sendStatus(404);
        }
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

export const addFavourite = async (req, res) => {
    try {
        const favourite = await Favourite.create(req.body);
        console.log(req.body)
        res.json({
            "message": "Favourite Created",
            data: favourite
        });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

export const updateFavourite = async (req, res) => {
    try {
        const Favourite = await Favourite.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "Favourite Updated",
            data: Favourite
        });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

export const deleteFavourite = async (req, res) => {
    try {
        await Favourite.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "Favourite Deleted"
        });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}
