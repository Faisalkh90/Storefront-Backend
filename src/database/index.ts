import { Pool } from 'pg';
import { config } from '../../config/sequelize';

const pool = new Pool({
  host: config.host,
  database: config.database,
  user: config.username,
  password: config.password,
  // port: parseInt(config.dbPort as string, 10),
});

pool.on('error', (error) => {
  console.error(`Error: ${error.message}`);
});

export default pool;
