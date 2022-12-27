import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Delete,
  Post,
  Req,
  Body,
  Put,
} from '@nestjs/common';
import { PresenceService } from './presence.service';
import { Presence } from './entities/presence.entity';

@Controller('presence')
export class PresenceController {
  constructor(private readonly presenceService: PresenceService) {}

  @Get('/')
  async handleRequestAllSekers(): Promise<Presence[]> {
    return await this.presenceService.findAll();
  }

  @Get('/:id')
  async index(@Param('id') id): Promise<Presence> {
    if (!id) {
      throw new HttpException(
        {
          status: HttpStatus.FAILED_DEPENDENCY,
          error: 'presence not provided',
        },
        HttpStatus.FAILED_DEPENDENCY,
      );
    }

    const requestedPresence = await this.presenceService.findOne(id);

    if (!requestedPresence) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `presence with id ${id} not found`,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return requestedPresence;
  }

  @Delete('/:id')
  async handleDeleteFile(@Param() param) {
    const presenceId = param.id;

    const deletedResult = await this.presenceService.remove(presenceId);

    if (deletedResult.affected < 1) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'The presence you are trying to remove does not exist',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    throw new HttpException(
      {
        status: HttpStatus.ACCEPTED,
        message: 'The presence was successfully deleted',
      },
      HttpStatus.ACCEPTED,
    );
  }

  @Post()
  async handleSetPresence(@Req() req, @Body() presence: Presence) {
    return this.presenceService.setPresence(presence);
  }

  @Put(':id')
  async handleUpdatePresence(@Req() req, @Param('id') presenceId: string) {
    return this.presenceService.update(presenceId);
  }
}
