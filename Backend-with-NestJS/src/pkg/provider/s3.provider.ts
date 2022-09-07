import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { S3Module } from '../../s3/s3.module';
import { S3Config } from '../config/s3.config';

@Module({
  imports: [
    S3Module.forRootAsync({
      imports: [ConfigModule],
      useFactory: (s3Config: ConfigType<typeof S3Config>) => ({
        bucket: s3Config.bucket,
        region: s3Config.region,
        endpoint: s3Config.endpoint,
        credentials: {
          accessKeyId: s3Config.key,
          secretAccessKey: s3Config.secret,
        },
      }),
      inject: [S3Config.KEY],
    }),
  ],
  exports: [S3Module],
})
export class S3Provider {}
