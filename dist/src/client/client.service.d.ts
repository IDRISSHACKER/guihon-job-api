import { Repository } from 'typeorm';
import ClientRestInterface from '../Interfaces/ClientRest.interface';
import { ImageService } from '../image/image.service';
export declare class ClientService {
    private clientRepository;
    private readonly imageService;
    constructor(clientRepository: Repository<ClientRestInterface>, imageService: ImageService);
    setClient(client: any): Promise<any>;
    findAll(): Promise<any>;
    findOne(id: string): Promise<any>;
    remove(id: string): Promise<any>;
}
