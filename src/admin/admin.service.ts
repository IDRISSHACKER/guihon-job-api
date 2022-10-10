import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {Admin} from "./entities/admin.entity";

@Injectable()
export class AdminService {
  constructor(
      @InjectRepository(Admin)
      private adminRepository: Repository<Admin>,
  ) {
  }


  async findOne(id: string): Promise<Admin> {
    return await this.adminRepository.findOneBy({id});
  }
}