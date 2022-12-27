import { Repository } from 'typeorm';
import { Image } from './entities/image.entity';
export declare class ImageService {
    private ImageRepository;
    constructor(ImageRepository: Repository<Image>);
    SetImage(image: Image): Promise<Image>;
    findAll(): Promise<Image[]>;
    findOne(id: string): Promise<Image>;
    findById(id: string): Promise<Image[]>;
    remove(id: string): Promise<any>;
}
