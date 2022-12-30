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
import {PlaningService} from "./planing.service";
import {Planing} from "./entities/planing.entity";


@Controller('planing')
export class PlaningController {
  constructor(private readonly planingService: PlaningService) {
  }

  @Get('/')
  async handleRequestAllPlanings(): Promise<Planing[]> {
    return await this.planingService.findAll();
  }


  @Get('/:id')
  async index(@Param('id') id): Promise<Planing> {
    if (!id) {
      throw new HttpException(
          {
            status: HttpStatus.FAILED_DEPENDENCY,
            error: 'planing with ID not provided',
          },
          HttpStatus.FAILED_DEPENDENCY,
      );
    }

    const requestedPlaning = await this.planingService.findOne(id);

    if (!requestedPlaning) {
      throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: `planing with id ${id} not found`,
          },
          HttpStatus.NOT_FOUND,
      );
    }

    return requestedPlaning;
  }

  @Post()
  async handleSavePlaning(@Req() req, @Body() body: Planing) {

    if (!body.clientId || !body.prix) {
      throw new HttpException(
          {
            status: HttpStatus.FAILED_DEPENDENCY,
            error: 'All fields are mandatory',
          },
          HttpStatus.FAILED_DEPENDENCY,
      );
    }

    return this.planingService.setPlaning(body);
  }

  @Delete('/:id')
  async handleDeletePlaning(@Param('id') id) {

    const deletedResult = await this.planingService.remove(id);

    if (deletedResult.affected < 1) {
      throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'The planing you are trying to delete does not exist',
          },
          HttpStatus.NOT_FOUND,
      );
    }

    throw new HttpException(
        {
          status: HttpStatus.ACCEPTED,
          message: 'The planing was successfully deleted',
        },
        HttpStatus.ACCEPTED,
    );
  }
}
