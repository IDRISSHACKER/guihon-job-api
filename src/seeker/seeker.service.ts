import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seeker } from './entities/seeker.entity';
import {SeekerInterface} from "../Interfaces/Seeker.interface";

@Injectable()
export class SeekerService {
  constructor(
    @InjectRepository(Seeker)
    private seekerRepository: Repository<Seeker>,
  ) {}

  async setSeeker(
    seeker: SeekerInterface
  ): Promise<Seeker> {

    return await this.seekerRepository.save(seeker)

  }

  findAll(): Promise<Seeker[]> {
    return this.seekerRepository.find();
  }

  async findOne(
    id: string,
  ): Promise<Seeker> {
    return  await this.seekerRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<any> {
    return await this.seekerRepository.delete(id);
  }
}
