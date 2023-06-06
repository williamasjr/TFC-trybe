import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../auth/authFucntions';
import TeamsService from '../services/TeamsService';

async function TokenValidate(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }
  const validToken = verifyToken(authorization);
  console.log(validToken);
  if (!validToken) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
  req.body.user = validToken;
  next();
}

export const newMatchesValidate = async (req: Request, res: Response, next: NextFunction) => {
  const { homeTeamId, awayTeamId } = req.body;
  if (awayTeamId === homeTeamId) {
    return res.status(422)
      .json({ message: 'It is not possible to create a match with two equal teams' });
  }
  const away = await TeamsService.findById(awayTeamId);
  const home = await TeamsService.findById(homeTeamId);
  if (!away || !home) {
    return res.status(404).json({ message: 'There is no team with such id!' });
  }
  return next();
};

export default TokenValidate;
