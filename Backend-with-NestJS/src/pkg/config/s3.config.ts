import { registerAs } from '@nestjs/config';

export const S3Config = registerAs('s3', () => ({
  key: process.env.S3_KEY || '',
  secret: process.env.S3_SECRET || '',
  endpoint: process.env.S3_ENDPOINT || '',
  region: process.env.S3_REGION || '',
  bucket: process.env.S3_BUCKET || '',
}));
