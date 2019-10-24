import dotenv from 'dotenv';

dotenv.config();

export interface I_config_component {
  username: string;
  password: string;
  database: string;
  host: string;
  dialect: 'mysql';
  define: {
    freezeTableName: boolean;
  };
}

export interface I_config {
  development: I_config_component;
  production?: I_config_component;
}

const config: I_config = {
  development: {
    username: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD as string,
    database: 'test',
    host: 'localhost',
    dialect: 'mysql',
    define: {
      freezeTableName: true
    }
  },
  production: {
    username: process.env.PRODUCTION_DB_USER as string,
    password: process.env.PRODUCTION_DB_PASSWORD as string,
    database: 'sos_db',
    host: 'localhost',
    dialect: 'mysql',
    define: {
      freezeTableName: true
    }
  }
};

export default config;
