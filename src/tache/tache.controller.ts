import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import {Tache} from "./entities/tache.entity";
import {TacheService} from "./tache.service";

@Controller('tache')
export class TacheController {
  constructor(private readonly tacheService: TacheService) {}

  @Get('/')
  async handleRequestAllTache(): Promise<Tache[]> {
    return await this.tacheService.findAll();
  }

  @Get('/:id')
  async index(@Param('id') id): Promise<Tache> {
    if (!id) {
      throw new HttpException(
        {
          status: HttpStatus.FAILED_DEPENDENCY,
          error: 'tache ID not provided',
        },
        HttpStatus.FAILED_DEPENDENCY,
      );
    }

    const requestedTache = await this.tacheService.findOne(id);

    if (!requestedTache) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `tache with id ${id} not found`,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return requestedTache;
  }

  @Post()
  async handleSaveTache(@Req() req, @Body() body: Tache) {

    if (!body.planingId) {
      throw new HttpException(
        {
          status: HttpStatus.FAILED_DEPENDENCY,
          error: 'All fields are mandatory',
        },
        HttpStatus.FAILED_DEPENDENCY,
      );
    }

    return this.tacheService.setTache(body);
  }

  @Delete('/:id')
  async handleDeleteTache(@Param('id') id) {
    const deletedResult = await this.tacheService.remove(id);

    if (deletedResult.affected < 1) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'The tache you are trying to delete does not exist',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    throw new HttpException(
      {
        status: HttpStatus.ACCEPTED,
        message: 'The tache was successfully deleted',
      },
      HttpStatus.ACCEPTED,
    );
  }

}
