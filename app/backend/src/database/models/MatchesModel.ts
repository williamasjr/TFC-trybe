import { DataTypes, Model } from 'sequelize';
import sequelize from '.';
import TeamsModel from './TeamsModel';

export interface AtributesMatches {
  id?: number;
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

class MatchesModel extends Model<AtributesMatches> {
  declare id: number;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

MatchesModel.init({
  id: {
    allowNull: false,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  homeTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'teams',
      key: 'id',
    },
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  awayTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'teams',
      key: 'id',
    },
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
  },
}, {
  tableName: 'matches',
  sequelize,
  timestamps: false,
  underscored: true,
});

MatchesModel.belongsTo(TeamsModel, {
  foreignKey: 'homeTeamId',
  as: 'homeTeam',
});

MatchesModel.belongsTo(TeamsModel, {
  foreignKey: 'awayTeamId',
  as: 'awayTeam',
});

export default MatchesModel;
