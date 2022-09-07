import { registerAs } from '@nestjs/config';

export const GenericConfig = registerAs('generic', () => ({
  port: +process.env.PORT || 8080,
  mode: process.env.MODE || 'dev',
  salt: +process.env.SALT || 8,
  isProduction: process.env.MODE === 'production' || false,
}));
