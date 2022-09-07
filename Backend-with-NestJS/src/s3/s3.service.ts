import { ListBucketsCommand, S3Client } from '@aws-sdk/client-s3';
import { Inject, Injectable } from '@nestjs/common';
import { S3ModuleOption, S3_MODULE_CONFIG } from './s3.interface';

@Injectable()
export class S3Service {
  private s3Client: S3Client;

  constructor(@Inject(S3_MODULE_CONFIG) options: S3ModuleOption) {
    if (!this.s3Client) {
      this.s3Client = new S3Client(options);

      this.s3Client.send(new ListBucketsCommand({})).then((res) => {
        const { Buckets } = res;
        const bucketNames = Buckets.map((e) => e.Name);
        if (!bucketNames.includes(options.bucket)) {
          throw new Error('bucket-name-not-found');
        }
      });
    }
  }

  getS3Client(): S3Client {
    return this.s3Client;
  }
}
