import { registerAs } from '@nestjs/config';

export const JwtConfig = registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET,
  life: process.env.JWT_TOKEN_LIFE,
}));
