import { DataTypes, Model } from 'sequelize';
import sequelize from '.';

export interface TeamsAtributes {
  id: number;
  teamName: string;
}

export type TeamsCreateAtribures = Omit<TeamsAtributes, 'id'>;

class TeamsModel extends Model<TeamsAtributes, TeamsCreateAtribures> {
  declare id: number;
  declare teamName: string;
}

TeamsModel.init({
  id: {
    allowNull: false,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  teamName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'teams',
  sequelize,
  timestamps: false,
  underscored: true,
});

export default TeamsModel;
