import { Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const LeaderboardRouter = Router();
LeaderboardRouter.get('/leaderboard/home', LeaderboardController.findAllHome);
LeaderboardRouter.get('/leaderboard/away', LeaderboardController.findAllAway);

export default LeaderboardRouter;
