import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {Employetache} from "./entities/employetache.entity";
import { ulid } from 'ulidx';

@Injectable()
export class EmployetacheService {
  constructor(
    @InjectRepository(Employetache)
    private employeTacheRepository: Repository<Employetache>,
  ) {}

  async setEmployeTache(employeTache: Employetache): Promise<any> {

    const existEmploye:Employetache[] = await this.employeTacheRepository.findBy({tacheId: employeTache.tacheId})

    if(existEmploye.length !== 0){

      return await this.employeTacheRepository.save({ id: ulid(), ...employeTache });

    }else{

      return await this.employeTacheRepository.save({ id: ulid(), isAdmin: true, ...employeTache });

    }
  }

  async findAll(): Promise<Employetache[]> {
    return (await this.employeTacheRepository.find({
      order: {
        id: 'DESC',
      },
    })) as unknown as Array<Employetache>;
  }

  async findOne(id: string): Promise<Employetache> {
    return await this.employeTacheRepository.findOneBy({ id });
  }

  async findByTache(id: string): Promise<Employetache[]> {
    return await this.employeTacheRepository.findBy({ tacheId: id });
  }

  async remove(tacheId: string, userId: string): Promise<any> {
    return await this.employeTacheRepository.delete({
      tacheId: tacheId,
      userId: userId
    });
  }
}
