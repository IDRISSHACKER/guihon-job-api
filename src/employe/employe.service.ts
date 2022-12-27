import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employe } from './entities/employe.entity';
import { LoginInterace } from '../Interfaces/Login.interace';
import { PresenceService } from '../presence/presence.service';
import { ulid } from 'ulidx';

@Injectable()
export class EmployeService {
  constructor(
    @InjectRepository(Employe)
    private readonly employeRepository: Repository<Employe>,
    private readonly presenceService: PresenceService,
  ) {}

  async setEmploye(employe: Employe): Promise<any> {
    const user = await this.employeRepository.save({ id: ulid(), ...employe });
    const presence = await this.presenceService.findByUser(user.id);

    return {
      ...user,
      presence: presence !== null ? presence : {},
    };
  }

  async findAll(): Promise<any> {
    const employes = await this.employeRepository.find({
      order: {
        id: 'DESC',
      },
    });

    const presenceUsers = [];

    for (const employe of employes) {
      const presence = await this.presenceService.findByUser(employe.id);

      const data = {
        ...employe,
        presence: presence !== null ? presence : {},
      };

      presenceUsers.push(data);
    }
    return presenceUsers;
  }

  async findOne(id: string): Promise<any> {
    const user = await this.employeRepository.findOneBy({ id });
    const presence = await this.presenceService.findByUser(user.id);

    return {
      ...user,
      presence: presence !== null ? presence : {},
    };
  }

  async findUser(user: LoginInterace) {
    return await this.employeRepository.findOneBy({
      tel: user.tel,
      secret: user.password,
    });
  }

  async remove(id: string): Promise<any> {
    return await this.employeRepository.delete(id);
  }
}
