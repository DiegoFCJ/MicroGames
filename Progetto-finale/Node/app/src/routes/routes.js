import express from "express";

const API_ROOT = '/api';

import { getRating, createRating, updateRating, deleteRating } from "../controllers/ratings-controller.js";
import { getFavorite, getFavoriteByUserId, createFavorite, deleteFavorite } from "../controllers/favorite-controller.js";
import { createRanking, getRanking, getRankingByUserId } from "../controllers/rankings-controller.js"
const router = express.Router();

router.get(`${API_ROOT}/rating/:userId/:movieId`, getRating);
router.post(`${API_ROOT}/rating`, createRating);
router.patch(`${API_ROOT}/rating/:id`, updateRating);
router.delete(`${API_ROOT}/rating/:id`, deleteRating);
router.get(`${API_ROOT}/:userId`, getFavorite);
router.get(`${API_ROOT}/favorite/:userId`, getFavoriteByUserId);
router.post(`${API_ROOT}/favorite`, createFavorite);
router.delete(`${API_ROOT}/favorite/:userId/:movieId`, deleteFavorite);
router.get(`${API_ROOT}/rankingall/:userId`, getRanking);
router.get(`${API_ROOT}/ranking/:userId`, getRankingByUserId);
router.post(`${API_ROOT}/ranking`, createRanking);




export default router;
