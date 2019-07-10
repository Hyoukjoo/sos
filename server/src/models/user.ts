import Sequelize, { Model, DataTypes } from 'sequelize';

import { sequelize } from '.';
import { Post } from './post';
import { Profile } from './profile';

export class User extends Model<User> {
  public userId!: string;
  public password!: string;
  public email!: string;

  public readonly createAt!: Date;
  public readonly updateAt!: Date;

  public addPost!: Sequelize.HasManyAddAssociationMixin<Post, number>;

  public setProfile!: Sequelize.HasOneSetAssociationMixin<Profile, number>;

  public readonly posts?: Post[];
  public readonly profile?: Profile;

  public static associations: {
    posts: Sequelize.Association<User, Post>;
    profile: Sequelize.Association<User, Profile>;
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
      },
      email: {
        type: DataTypes.STRING
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
  User.hasMany(Post, { foreignKey: 'authorId', sourceKey: 'userId', as: 'posts' });
  // User.hasOne(Profile, { foreignKey: 'userId', sourceKey: 'userId' });

  return User;
};
