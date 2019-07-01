import { Model, DataTypes, ModelCtor } from 'sequelize';
import { HasManyAddAssociationMixin, Association } from 'sequelize/types';

import { sequelize } from '.';
import { Post } from './post';
import { Profile } from './profile';
import { HasOneSetAssociationMixin } from 'sequelize';

export class User extends Model {
  public userId!: string;
  public password!: string;
  public email!: string;

  public readonly createAt!: Date;
  public readonly updateAt!: Date;

  public addPost!: HasManyAddAssociationMixin<Post, string>;
  public setProfile!: HasOneSetAssociationMixin<Profile, string>;

  public readonly posts?: Post[];
  public readonly profile?: Profile;

  public static associations: {
    posts: Association<User, Post>;
    profile: Association<User, Profile>;
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
      tableName: 'users'
    }
  );
};

export const associateUser = () => {
  User.hasMany(Post, { foreignKey: 'author', sourceKey: 'userId', as: 'posts' });
  // User.hasOne(Profile, { foreignKey: 'userId', sourceKey: 'userId' });

  return User;
};
