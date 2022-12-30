import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './entities/client.entity';
import ClientRestInterface from '../Interfaces/ClientRest.interface';
import { ImageService } from '../image/image.service';
import { ulid } from 'ulidx';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<ClientRestInterface>,
    private readonly imageService: ImageService,
  ) {}

  async setClient(client: any): Promise<any> {
    const clientSaved = await this.clientRepository.save({
      id: ulid(),
      ...client,
    });

    const clientId = clientSaved.id;
    const clientImage = await this.imageService.findById(clientId);

    return {
      ...client,
      images: clientImage !== null ? clientImage : [],
    };
  }

  async findAll(): Promise<any> {
    const clients = (await this.clientRepository.find({
      order: {
        id: 'DESC',
      },
    })) as unknown as Array<Client>;

    const clientImg = [];

    for (const client of clients) {
      const clientId = client.id;
      const clientImage = await this.imageService.findById(clientId);

      const data = {
        ...client,
        images: clientImage !== null ? clientImage : [],
      };

      clientImg.push(data);
    }

    return clientImg;
  }

  async findOne(id: string): Promise<any> {
    const client = await this.clientRepository.findOneBy({ id });


    const clientImage = await this.imageService.findById(client.id);

    return {
      ...client,
      images: clientImage !== null ? clientImage : [],
    };
  }

  async remove(id: string): Promise<any> {
    const client = await this.clientRepository.findOneBy({ id });
    const clientId = client.id;

    const clientImage = await this.imageService.findById(clientId);

    for (const img of clientImage) {
      await this.imageService.remove(img.id);
    }

    return await this.clientRepository.delete(id);
  }
}
