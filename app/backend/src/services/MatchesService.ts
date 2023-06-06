import TeamsModel from '../database/models/TeamsModel';
import MatchesModel, { AtributesMatches } from '../database/models/MatchesModel';

class MatchesService {
  public static async findAll(progress: unknown): Promise<AtributesMatches[]> {
    const matches = await MatchesModel.findAll({ include: [{
      model: TeamsModel,
      as: 'homeTeam',
      attributes: ['teamName'],
    }, {
      model: TeamsModel,
      as: 'awayTeam',
      attributes: ['teamName'],
    }] });
    if (progress === 'true') {
      return matches.filter((prog) => prog.inProgress === true);
    }
    if (progress === 'false') {
      return matches.filter((prog) => prog.inProgress === false);
    }
    return matches;
  }

  public static async create(
    homeTeamId: number,
    homeTeamGoals: number,
    awayTeamId: number,
    awayTeamGoals: number,
  ): Promise<AtributesMatches> {
    const newMatch = await MatchesModel.create(
      {
        homeTeamId,
        homeTeamGoals,
        awayTeamId,
        awayTeamGoals,
        inProgress: true,
      },
    );
    return newMatch;
  }

  public static async finish(id: number):Promise<void> {
    const math = await MatchesModel.findByPk(id);
    math!.inProgress = false;
    await math?.save();
  }

  public static async matchUpdate(id: number, homeTeamGoal: number, awayTeamGoal: number)
    :Promise <AtributesMatches> {
    const matches = await MatchesModel.findByPk(id);
    matches!.homeTeamGoals = homeTeamGoal;
    matches!.awayTeamGoals = awayTeamGoal;
    matches?.save();
    return matches!;
  }
}
export default MatchesService;
