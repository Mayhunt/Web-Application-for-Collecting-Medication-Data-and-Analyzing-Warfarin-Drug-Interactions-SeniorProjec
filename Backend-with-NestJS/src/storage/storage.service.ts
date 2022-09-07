import { GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import * as dayjs from 'dayjs';
import { nanoid } from 'nanoid';
import { extname } from 'path';
import { S3Config } from '../pkg/config/s3.config';
import { S3Service } from '../s3/s3.service';

@Injectable()
export class StorageService {
  constructor(
    private s3Service: S3Service,
    @Inject(S3Config.KEY)
    private s3Config: ConfigType<typeof S3Config>,
  ) {}

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const key = `${nanoid(8)}${extname(file.originalname)}`;
    const command = new PutObjectCommand({
      Bucket: this.s3Config.bucket,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
      Metadata: {
        ['Original-Name']: file.originalname,
        ['Created-At']: dayjs().toISOString(),
      },
    });

    await this.s3Service.getS3Client().send(command);

    return key;
  }

  async getFile(key: string) {
    const command = new GetObjectCommand({
      Bucket: this.s3Config.bucket,
      Key: key,
    });

    const response = await this.s3Service.getS3Client().send(command);
    return response;
  }
}
