import { registerAs } from '@nestjs/config';
import { parseBoolean } from '../utility/parser.utility';

export const DatabaseConfig = registerAs('database', () => ({
  host: process.env.POSTGRES_HOST || '127.0.0.1',
  port: +process.env.POSTGRES_PORT || 5432,
  database: process.env.POSTGRES_DATABASE || 'postgres',
  username: process.env.POSTGRES_USERNAME || 'postgres',
  password: process.env.POSTGRES_PASSWORD,
  isSync: parseBoolean(process.env.POSTGRES_SYNC) || false,
  isDrop: parseBoolean(process.env.POSTGRES_DROP) || false,
  isLog: parseBoolean(process.env.POSTGRES_LOG) || false,
  caCert: process.env.POSTGRES_CA_CERT,
}));
