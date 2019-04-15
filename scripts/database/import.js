import path from 'path';
import SequelizeAuto from 'sequelize-auto';
import {
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  DATABASE_NAME,
} from '../../src/utils/env';

(function() {
  const pgsqlImportSchema = new SequelizeAuto(
    DATABASE_NAME,
    DATABASE_USERNAME,
    DATABASE_PASSWORD,
    {
      host: DATABASE_HOST,
      dialect: 'postgres',
      port: DATABASE_PORT,
      dialectOptions: {
        encrypt: true
      },
      directory: path.resolve(__dirname, '../../src/connectors/postgresql/schemas'),
      schema: 'public',
      additional: {
        timestamps: false,
      }
    },
  );

  pgsqlImportSchema.run(function (err) {
      if (err) throw err;

      console.log(pgsqlImportSchema.tables);
      console.log(pgsqlImportSchema.foreignKeys);
  });
})();



