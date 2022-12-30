import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Planing} from "./entities/planing.entity";
import {ulid} from 'ulidx';
import {ClientService} from "../client/client.service";

@Injectable()
export class PlaningService {
  constructor(
    @InjectRepository(Planing)
    private readonly planingRepository: Repository<Planing>,
    private readonly clientService: ClientService
  ) {}

  async setPlaning(planing: any): Promise<any> {
    const planingrest = await this.planingRepository.save({id: ulid(), ...planing});

    const client = await this.clientService.findOne(planingrest.clientId)

    return {
      ...planingrest,
      client: client !== null ? client : {},
    }
  }

  async findAll(): Promise<Planing[]> {
    const planings = await this.planingRepository.find({
      order: {
        id: 'DESC',
      },
    });

    const planingsClient = [];

    for (const planing of planings) {
      const client = await this.clientService.findOne(planing.clientId);

      const data = {
        ...planing,
        client: client !== null ? client : [],
      };

      planingsClient.push(data);
    }

    return planingsClient;
  }

  async findOne(id: string): Promise<any> {
    const planing =  await this.planingRepository.findOneBy({ id: id });

    const client = await this.clientService.findOne(planing.clientId)


    return {
      ...planing,
      client: client !== null ? client : {},
    }
  }

  async remove(id: string): Promise<any> {
    return await this.planingRepository.delete(id);
  }
}
