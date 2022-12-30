import { Repository } from 'typeorm';
import { Planing } from "./entities/planing.entity";
import { ClientService } from "../client/client.service";
export declare class PlaningService {
    private readonly planingRepository;
    private readonly clientService;
    constructor(planingRepository: Repository<Planing>, clientService: ClientService);
    setPlaning(planing: any): Promise<any>;
    findAll(): Promise<Planing[]>;
    findOne(id: string): Promise<any>;
    remove(id: string): Promise<any>;
}
