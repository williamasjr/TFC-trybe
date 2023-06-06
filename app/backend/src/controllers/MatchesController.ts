import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

class MatchesController {
  matchesService: any;
  public static async findAll(req: Request, res: Response) {
    const { inProgress } = req.query;
    const matches = await MatchesService.findAll(inProgress);
    return res.status(200).json(matches);
  }

  public static async create(req: Request, res: Response) {
    const { homeTeamId, homeTeamGoals,
      awayTeamId, awayTeamGoals } = req.body;
    const matchNew = await MatchesService.create(
      homeTeamId,
      homeTeamGoals,
      awayTeamId,
      awayTeamGoals,
    );
    return res.status(201).json(matchNew);
  }

  public static async finish(req: Request, res: Response) {
    const { id } = req.params;
    await MatchesService.finish(Number(id));
    return res.status(200).json({ message: 'Finished' });
  }

  public static async matchUpdate(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const matchsUpdate = await MatchesService
      .matchUpdate(Number(id), homeTeamGoals, awayTeamGoals);
    return res.status(200).json(matchsUpdate);
  }
}
export default MatchesController;
