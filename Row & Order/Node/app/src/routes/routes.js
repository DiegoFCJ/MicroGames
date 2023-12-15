import express from "express";
import { addScore, deleteScore, getScore, top10 } from "../controllers/score-controller.js";

const router = express.Router();

/* Seguono le routes delle API implementate in "score-controller" */

router.get(`/scoresOfUser/:userId`, getScore);
router.get(`/top10`, top10);
router.post(`/score`, addScore);
router.delete(`/score/:id`, deleteScore);

export default router;
