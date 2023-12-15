import FavoriteMovie from "../models/favorite-movie.js";

export const getFavorite = async (req, res) => {
    try {
        const favorite = await FavoriteMovie.findOne({
            where: {
                userId: req.params.userId,
                movieId: req.params.movieId,
            }
        });
        
        if (favorite) {
            res.send(favorite);
        } else {
            res.sendStatus(404);
        }
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

export const createFavorite = async (req, res) => {
    try {
        const favorite = await FavoriteMovie.create(req.body);
        console.log(req.body)
        res.json({
            "message": "Favorite Created",
            data: favorite
        });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

export const getFavoriteByUserId = async (req, res) => {
    try {
        const favorite = await FavoriteMovie.findAll({
            where: {
                userId: req.params.userId,
            }
        });
        
        if (favorite) {
            res.send(favorite);
        } else {
            res.sendStatus(404);
        }
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}


export const deleteFavorite = async (req, res) => {
    try {
        await FavoriteMovie.destroy({
            where: {
                userId:req.params.userId,
                movieId: req.params.movieId
            }
        });
        res.json({
            "message": "Favorite Movie Deleted"
        });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}
