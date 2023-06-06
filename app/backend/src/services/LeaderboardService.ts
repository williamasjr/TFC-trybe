import sequelize from '../database/models';
import AwayTeamGoals from '../querysSql/AwayTeamGoals';
import HomeTeamGoals from '../querysSql/HomeTeamGoals';

interface leaderboard {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: string
}

class LeaderboardService {
  public static async findAllHome(): Promise<leaderboard[]> {
    const [leaderboard] = await sequelize.query(HomeTeamGoals);
    return leaderboard as leaderboard[];
  }

  public static async findAllAway(): Promise<leaderboard[]> {
    const [leaderboard] = await sequelize.query(AwayTeamGoals);
    return leaderboard as leaderboard[];
  }
}

export default LeaderboardService;
