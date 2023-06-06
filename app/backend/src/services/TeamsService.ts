import TeamsModel from '../database/models/TeamsModel';

type FindAllTeamsOutput = {
  id: number;
  teamName: string;
};

class TeamsService {
  public static async findAll() {
    const found = await TeamsModel.findAll();
    return found;
  }

  public static async findById(id: number): Promise<FindAllTeamsOutput | null> {
    const found = await TeamsModel.findByPk(id);
    return found;
  }
}

export default TeamsService;
