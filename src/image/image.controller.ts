import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  HttpException,
  HttpStatus,
  Param,
  Res,
  Delete,
  UseInterceptors,
  UploadedFile,
  StreamableFile,
} from '@nestjs/common';
import { ImageService } from './image.service';
import { Image } from './entities/image.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UPLOAD_FOLDER } from '../utils/Const';
import { generateUniqueFileName } from '../functions/fileName';
const path = require('path');
import mine = require('mime-types');
import { join } from 'path';
import { createReadStream } from 'fs';
import type { NextFunction, Response as ResponseType } from 'express';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Get('/')
  async handleRequestAllSekers(): Promise<Image[]> {
    return await this.imageService.findAll();
  }

  @Get('/:image')
  async index(
    @Param('image') image,
    @Res({ passthrough: true }) res: ResponseType,
  ) {
    const rootToFile = path.join(UPLOAD_FOLDER, image);
    const finalFilePath = join(process.cwd(), rootToFile);

    if (!image) {
      throw new HttpException(
        {
          status: HttpStatus.FAILED_DEPENDENCY,
          error: 'image ID not provided',
        },
        HttpStatus.FAILED_DEPENDENCY,
      );
    }

    res.set({
      'Content-Type': mine.contentType(rootToFile),
    });
    const streamable = createReadStream(finalFilePath);
    return new StreamableFile(streamable);
  }

  @Delete('/:id')
  async handleDeleteFile(@Param() param) {
    const clientId = param.id;

    const deletedResult = await this.imageService.remove(clientId);

    if (deletedResult.affected < 1) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'The image you are trying to delete does not exist',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    throw new HttpException(
      {
        status: HttpStatus.ACCEPTED,
        message: 'The image was successfully deleted',
      },
      HttpStatus.ACCEPTED,
    );
  }

  @Post('/:clientId')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: UPLOAD_FOLDER,

        filename(req, file, callback) {
          callback(null, generateUniqueFileName(file.originalname));
        },
      }),
    }),
  )
  async handleUploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Req() req,
    @Param() param: Image,
  ) {
    console.log(param);

    if (!file) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'You did not provide any files',
        },
        HttpStatus.FORBIDDEN,
      );
    }

    const img = {
      path: file.filename,
      clientId: param.clientId,
    };

    return this.imageService.SetImage(img as unknown as Image);
  }
}
