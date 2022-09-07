import {
  Controller,
  Get,
  Post,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { Readable } from 'stream';
import { StorageService } from './storage.service';

@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.storageService.uploadFile(file);
  }

  @Get('')
  async getFile(@Query('key') key: string, @Res() res: Response) {
    const { Body, ContentType } = await this.storageService.getFile(key);
    const stream = Body as Readable;
    res.set({ 'Content-Type': ContentType });
    return stream.pipe(res);
  }
}
