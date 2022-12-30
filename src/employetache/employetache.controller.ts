import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Delete,
  Post,
  Req,
  Body, Query,
} from '@nestjs/common';
import {Employetache} from "./entities/employetache.entity";
import {EmployetacheService} from "./employetache.service";

@Controller('employetache')
export class EmployetacheController {
  constructor(private readonly employeTacheService: EmployetacheService) {}

  @Get('/')
  async handleRequestAllEmployeTache(): Promise<Employetache[]> {
    return await this.employeTacheService.findAll();
  }

  @Get('/:id')
  async index(@Param('id') id): Promise<Employetache> {
    if (!id) {
      throw new HttpException(
        {
          status: HttpStatus.FAILED_DEPENDENCY,
          error: 'employeTache id not provided',
        },
        HttpStatus.FAILED_DEPENDENCY,
      );
    }

    const requestedEmployeTache = await this.employeTacheService.findOne(id);

    if (!requestedEmployeTache) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `employeTache with id ${id} not found`,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return requestedEmployeTache;
  }

  @Delete('/:id')
  async handleDeleteEmployeTache(@Param('id') id, @Query('userId') userId) {
    const deletedResult = await this.employeTacheService.remove(id, userId);

    if (deletedResult.affected < 1) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'The employeTache you are trying to remove does not exist',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    throw new HttpException(
      {
        status: HttpStatus.ACCEPTED,
        message: 'The employeTache was successfully deleted',
      },
      HttpStatus.ACCEPTED,
    );
  }

  @Post()
  async handleSetEmployeTache(@Req() req, @Body() employeTache: Employetache) {
    return this.employeTacheService.setEmployeTache(employeTache);
  }
}
