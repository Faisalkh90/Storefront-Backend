import app from './app';
import { checkingEnvVariables } from './config/checking-env-variables';
import { startDbConnection } from './config/sequelize';
import Logger from './src/middlewares/logger';

const start = async () => {
  checkingEnvVariables();
  await startDbConnection();

  await app.listen(3000, () => Logger.info('Listening on port 3000!'));
  console.log('http://localhost:3000');
};

start();
