import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import {PRIVATE_KEY, TOKEN_DURATION} from '../utils/Const';
import { EmployeService } from './employe.service';
import { Employe } from './entities/employe.entity';
import { LoginInterace } from '../Interfaces/Login.interace';
import jwt = require('jsonwebtoken');

@Controller('employe')
export class EmployeController {
  constructor(private readonly employeService: EmployeService) {}

  @Get('/')
  async handleRequestAllSekers(): Promise<Employe[]> {
    return await this.employeService.findAll();
  }

  @Get('/info')
  async handleRequestLoginInfo(@Headers('authorization') token: string) {
    const tokenFormated = token.split(' ')[1];

    try {
      const verification = jwt.verify(tokenFormated, PRIVATE_KEY);
      return await this.employeService.findOne(verification.data.id);
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: 'token expired',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  @Get('/:employeID')
  async index(@Param('employeID') employeID): Promise<Employe> {
    if (!employeID) {
      throw new HttpException(
        {
          status: HttpStatus.FAILED_DEPENDENCY,
          error: 'employe ID not provided',
        },
        HttpStatus.FAILED_DEPENDENCY,
      );
    }

    const requestedEmloye = await this.employeService.findOne(employeID);

    if (!requestedEmloye) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `employe with id ${employeID} not found`,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return requestedEmloye;
  }

  @Post()
  async handleSaveEmploye(@Req() req, @Body() body: Employe) {
    console.log(body);

    if (!body.nom || !body.prenom || !body.email || !body.tel || !body.cni) {
      throw new HttpException(
        {
          status: HttpStatus.FAILED_DEPENDENCY,
          error: 'All fields are mandatory',
        },
        HttpStatus.FAILED_DEPENDENCY,
      );
    }

    return this.employeService.setEmploye(body);
  }

  @Delete('/:id')
  async handleDeleteFile(@Param() param) {
    const employeId = param.id;

    const deletedResult = await this.employeService.remove(employeId);

    if (deletedResult.affected < 1) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'The employe you are trying to delete does not exist',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    throw new HttpException(
      {
        status: HttpStatus.ACCEPTED,
        message: 'The employe was successfully deleted',
      },
      HttpStatus.ACCEPTED,
    );
  }

  @Post('/login')
  async handleLogin(@Body() userReq: LoginInterace) {
    if (!userReq.tel || !userReq.password) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: 'Phone and secret required',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    const user = await this.employeService.findUser(userReq);

    if (user) {
      const userData = {
        id: user.id,
      };
      //await this.employeService.updateToken(user.id, token)

      return await jwt.sign(
        {
          data: userData,
        },
        PRIVATE_KEY,
        { expiresIn: TOKEN_DURATION },
      );
    } else {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: 'The phone or password not found',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
