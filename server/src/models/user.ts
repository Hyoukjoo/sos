import Sequelize, { Model, DataTypes } from 'sequelize';

import { sequelize } from '.';
import { Post } from './post';
import { Like } from './like';
import { Profile } from './profile';
import { Follow } from './follow';

export class User extends Model<User> {
  public userId!: string;
  public password!: string;
  public email!: string;

  public readonly createAt!: Date;
  public readonly updateAt!: Date;

  public addPost!: Sequelize.HasManyAddAssociationMixin<Post, number>;

  public readonly userPost?: Post[];
  public readonly postLike?: Like[];
  public readonly userProfile?: Profile;

  public static associations: {
    posts: Sequelize.Association<User, Post>;
    userLike: Sequelize.Association<User, Like>;
    userProfile: Sequelize.Association<User, Profile>;
  };
}

export const initUserModel = () => {
  User.init(
    {
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      tableName: 'users',
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci'
    }
  );
};

export const associateUser = () => {
  User.hasMany(Post, { foreignKey: 'userId', sourceKey: 'userId', as: 'userPost' });
  User.hasMany(Like, { foreignKey: 'userId', sourceKey: 'userId', as: 'userLike' });
  User.hasOne(Profile, { foreignKey: 'userId', sourceKey: 'userId', as: 'userProfile' });

  return User;
};
