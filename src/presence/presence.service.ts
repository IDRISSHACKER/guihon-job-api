import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Not, Repository } from 'typeorm';
import { Presence } from './entities/presence.entity';
import { ulid } from 'ulidx';
import date = require('date-and-time');

@Injectable()
export class PresenceService {
  constructor(
    @InjectRepository(Presence)
    private presenceRepository: Repository<Presence>,
  ) {}

  async setPresence(presence: Presence): Promise<any> {
    return await this.presenceRepository.save({ id: ulid(), ...presence });
  }

  async findAll(): Promise<Presence[]> {
    return (await this.presenceRepository.find({
      order: {
        id: 'DESC',
      },
    })) as unknown as Array<Presence>;
  }

  async findOne(id: string): Promise<Presence> {
    return await this.presenceRepository.findOneBy({ id });
  }

  async findByUser(id: string): Promise<Presence> {
    const now = new Date();
    const datep = date.format(now, 'YYYY-MM-DD') as unknown as Date;

    return await this.presenceRepository.findOne({
      order: {
        id: 'DESC',
      },
      where: {
        userId: id,
        created_at: Not(LessThan(datep)),
      },
    });
  }

  async update(id: string) {
    return await this.presenceRepository.update(
      {
        id: id,
      },
      {
        ended: true,
      },
    );
  }

  async remove(id: string): Promise<any> {
    return await this.presenceRepository.delete(id);
  }
}
