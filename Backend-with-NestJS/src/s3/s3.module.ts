import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import {
  S3ModuleAsyncOptions,
  S3ModuleOption,
  S3ModuleOptionsFactory,
  S3_MODULE_CONFIG,
} from './s3.interface';
import { S3Service } from './s3.service';

@Global()
@Module({
  providers: [S3Service],
  exports: [S3Service],
})
export class S3Module {
  public static forRoot(options: S3ModuleOption): DynamicModule {
    return {
      module: S3Module,
      providers: [
        {
          provide: S3_MODULE_CONFIG,
          useValue: options,
        },
      ],
    };
  }

  static forRootAsync(options: S3ModuleAsyncOptions): DynamicModule {
    // But how to import other modules here and pass in the options?
    return {
      module: S3Module,
      imports: [...options.imports],
      providers: [...this.createAsyncProviders(options), S3Service],
      exports: [S3Service],
    };
  }
  private static createAsyncProviders(
    options: S3ModuleAsyncOptions,
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }
    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass,
      },
    ];
  }

  private static createAsyncOptionsProvider(
    options: S3ModuleAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: S3_MODULE_CONFIG,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }
    return {
      provide: S3_MODULE_CONFIG,
      useFactory: async (optionsFactory: S3ModuleOptionsFactory) =>
        await optionsFactory.createOptions(),
      inject: [options.useExisting || options.useClass],
    };
  }
}
