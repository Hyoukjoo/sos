import { Sequelize, Model, DataTypes, ModelCtor } from 'sequelize';
import { User } from '.';

class Relation extends Model {
  public leftUserId!: string;
  public rightUserId!: string;
  public status!: number;
  public recentPerformUser!: string;
}

export const initRelationModel = (sequelize: Sequelize) => {
  Relation.init(
    {
      leftUserId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: User,
          key: 'user_id'
        }
      },
      rightUserId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: User,
          key: 'user_id'
        }
      },
      status: {
        type: DataTypes.SMALLINT.UNSIGNED,
        allowNull: false
      },
      recentPerformUser: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      tableName: 'relations'
    }
  );

  return Relation;
};

export const associateRelation = (Relation: ModelCtor<Model<Relation, null>>) => {};
