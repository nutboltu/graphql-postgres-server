import Sequelize from 'sequelize';
import {
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  DATABASE_NAME,
} from '../../utils/env';

class PostGreSQLConnector {
  constructor() {
    this.connection = new Sequelize(
      DATABASE_NAME,
      DATABASE_USERNAME,
      DATABASE_PASSWORD,
      {
        host: DATABASE_HOST,
        port: DATABASE_PORT,
        dialect: 'postgres',
        pool: {
          max: 5,
          min: 0,
          idle: 10000,
        },
        dialectOptions: {
          encrypt: true,
        },
      },
    );
    this.healthCheck();
    return this.connection;
  }

  healthCheck = () => {
    try {
      this.connection.authenticate()
        .then(() => {
          // eslint-disable-next-line no-console
          console.info('PostgreSQL Connection has been established successfully.');
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.info('Unable to connect to the database:', err);
        });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.info('Unable to connect to the database:', err);
    }
  }

  closeConnection = () => {
    this.connection.close();
  }
}

export default new PostGreSQLConnector();
