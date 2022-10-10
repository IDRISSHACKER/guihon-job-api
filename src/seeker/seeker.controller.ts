import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
  Body,
  Query,
  Delete,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UPLOAD_FOLDER } from '../utils/Const';
import { SeekerService } from './seeker.service';
import { generateUniqueFileName } from '../functions/fileName';
import {SeekerBody, SeekerInterface} from "../Interfaces/Seeker.interface";
import {Seeker} from "./entities/seeker.entity";
import { ulid } from 'ulidx';

@Controller('seeker')
export class SeekerController {
  constructor(private readonly seekerService: SeekerService) {}

  @Get('/')
  async handleRequestAllSekers(
  ): Promise<Seeker[]> {
    return await this.seekerService.findAll();
  }

  @Get('/:seekerID')
  async index(
    @Param("seekerID") seekerID,
  ): Promise<Seeker> {
    if (!seekerID) {
      throw new HttpException(
        {
          status: HttpStatus.FAILED_DEPENDENCY,
          error: 'seeker id not provided',
        },
        HttpStatus.FAILED_DEPENDENCY,
      );
    }

    const requestedSeeker = await this.seekerService.findOne(seekerID);

    if (
      !requestedSeeker
    ) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `seeker with id ${seekerID} not found`,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return requestedSeeker;
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: UPLOAD_FOLDER,

        filename(req, file, callback) {
          console.log(file)
          callback(null, generateUniqueFileName(file.originalname));
        },
      }),
    }),
  )
  async handleUploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Req() req,
    @Body() body: SeekerBody
  ): Promise<Seeker> {

    console.log(file)

    if (!file) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'You did not provide any cv',
        },
        HttpStatus.FORBIDDEN,
      );
    }

    if (!body.name || !body.surname || !body.age || !body.phone || !body.cni) {
      throw new HttpException(
        {
          status: HttpStatus.FAILED_DEPENDENCY,
          error: 'All fields are mandatory',
        },
        HttpStatus.FAILED_DEPENDENCY,
      );
    }

    const newSeekerEntity: SeekerInterface = {
      id: ulid(),
      name: body.name,
      surname: body.surname,
      age: body.age,
      sex: body.sex,
      avatar: '',
      phone: body.phone,
      cni: body.cni,
      email: body.email,
      cv: file.filename,
    };



    return this.seekerService.setSeeker(newSeekerEntity);
  }

  @Delete('/:id')
  async handleDeleteFile(@Param() param) {
    const seekerId = param.id;

    const deletedResult = await this.seekerService.remove(seekerId);

    if (deletedResult.affected < 1) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'The seeker you are trying to delete does not exist',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    throw new HttpException(
      {
        status: HttpStatus.ACCEPTED,
        message: 'The seeker was successfully deleted',
      },
      HttpStatus.ACCEPTED,
    );
  }
}
