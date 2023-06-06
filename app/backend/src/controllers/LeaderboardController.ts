import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

class LeaderboardController {
  public static async findAllHome(req: Request, res: Response) {
    const leadBord = await LeaderboardService.findAllHome();
    return res.status(200).json(leadBord);
  }

  public static async findAllAway(req: Request, res: Response) {
    const leadBord = await LeaderboardService.findAllAway();
    return res.status(200).json(leadBord);
  }
}
export default LeaderboardController;
