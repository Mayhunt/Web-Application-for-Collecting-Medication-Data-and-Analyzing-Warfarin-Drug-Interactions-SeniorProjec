import { S3ClientConfig } from '@aws-sdk/client-s3';
import { ModuleMetadata, Type } from '@nestjs/common';

export interface S3ModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<S3ModuleOptionsFactory>;
  useClass?: Type<S3ModuleOptionsFactory>;
  useFactory?: (...args: any[]) => Promise<S3ModuleOption> | S3ModuleOption;
  inject?: any[];
}

export interface S3ModuleOptionsFactory {
  createOptions(): Promise<S3ModuleOption> | S3ModuleOption;
}

export const S3_MODULE_CONFIG = 'S3_MODULE_CONFIG';
export interface S3ModuleOption extends S3ClientConfig {
  bucket: string;
}
