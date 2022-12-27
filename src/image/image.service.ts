import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from './entities/image.entity';
import { ulid } from 'ulidx';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private ImageRepository: Repository<Image>,
  ) {}

  async SetImage(image: Image): Promise<Image> {
    return await this.ImageRepository.save({ id: ulid(), ...image });
  }

  findAll(): Promise<Image[]> {
    return this.ImageRepository.find();
  }

  async findOne(id: string): Promise<Image> {
    return await this.ImageRepository.findOneBy({ id });
  }

  async findById(id: string): Promise<Image[]> {
    return await this.ImageRepository.findBy({
      clientId: id,
    });
  }

  async remove(id: string): Promise<any> {
    return await this.ImageRepository.delete(id);
  }
}
