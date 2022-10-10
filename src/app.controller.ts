import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  StreamableFile,
  Res,
  Headers,
  Next,
  Ip,
} from '@nestjs/common';
import { AppService } from './app.service';
import * as fs from 'fs';
import path = require('path');
import { UPLOAD_FOLDER } from './utils/Const';
import type { NextFunction, Response as ResponseType } from 'express';
import mine = require('mime-types');
import { join } from 'path';
import { createReadStream, stat } from 'fs';
import { promisify } from 'util';
import { logger } from './functions/logger';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getWelcome(): string {
    return this.appService.welcomeToCinafFile();
  }

  @Get('file/:filePath')
  async handleStreamFile(
    @Param() param,
    @Res({ passthrough: true }) res: ResponseType,
    @Headers() header,
    @Ip() ip,
    @Next() next: NextFunction,
  ) {
    const rootToFile = path.join(UPLOAD_FOLDER, param.filePath);

    if (!fs.existsSync(rootToFile)) {
      logger('error', ip, rootToFile);
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `${param.filePath} not found on this server`,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    logger('info', ip, rootToFile);
    const finalFilePath = join(process.cwd(), rootToFile);

    const range = header.range;

    if (!range) {
      res.set({
        'Content-Type': mine.contentType(rootToFile),
      });
      const streamable = createReadStream(finalFilePath);
      return new StreamableFile(streamable);
    }

    res.set({
      'Content-Type': mine.contentType(rootToFile),
    });
    const infos = await promisify(stat)(finalFilePath);
    const parts = range.replace('bytes=', '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : infos.size - 1;
    res.set({
      'Content-Range': `bytes ${start}-${end}/${infos.size}`,
      'Accept-Ranges': `bytes`,
      'Content-Length': end - start + 1,
    });
    res.status(206);
    const file = createReadStream(finalFilePath, { start, end });
    return new StreamableFile(file);
  }
}
