import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  HttpException,
  HttpStatus,
  Param,
  Delete,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { Client } from './entities/client.entity';
import ClientRestInterface from '../Interfaces/ClientRest.interface';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get('/')
  async handleRequestAllSekers(): Promise<any> {
    return this.clientService.findAll();
  }

  @Get('/:clientId')
  async index(@Param('clientId') clientId): Promise<Client> {
    if (!clientId) {
      throw new HttpException(
        {
          status: HttpStatus.FAILED_DEPENDENCY,
          error: 'client ID not provided',
        },
        HttpStatus.FAILED_DEPENDENCY,
      );
    }

    const requestedClient = await this.clientService.findOne(clientId);

    if (!requestedClient) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `client with id ${clientId} not found`,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return requestedClient;
  }

  @Delete('/:id')
  async handleDeleteFile(@Param() param) {
    const clientId = param.id;

    const deletedResult = await this.clientService.remove(clientId);

    if (deletedResult.affected < 1) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'The client you are trying to delete does not exist',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    throw new HttpException(
      {
        status: HttpStatus.ACCEPTED,
        message: 'The client was successfully deleted',
      },
      HttpStatus.ACCEPTED,
    );
  }

  @Post()
  async handleUploadFile(@Req() req, @Body() body: Client) {
    console.log(body);

    if (!body.nom || !body.prenom || !body.email || !body.tel) {
      throw new HttpException(
        {
          status: HttpStatus.FAILED_DEPENDENCY,
          error: 'All fields are mandatory',
        },
        HttpStatus.FAILED_DEPENDENCY,
      );
    }

    return this.clientService.setClient(body);
  }
}
