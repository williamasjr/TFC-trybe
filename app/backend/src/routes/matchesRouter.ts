import { Router } from 'express';
import TokenValidate, { newMatchesValidate } from '../middlewares/TokenValidate';
import MatchesController from '../controllers/MatchesController';

const matchesRouter = Router();

matchesRouter.get('/', MatchesController.findAll);
matchesRouter.post('/', TokenValidate, newMatchesValidate, MatchesController.create);
matchesRouter.patch('/:id/finish', TokenValidate, MatchesController.finish);
matchesRouter.patch('/:id', TokenValidate, MatchesController.matchUpdate);

export default matchesRouter;
