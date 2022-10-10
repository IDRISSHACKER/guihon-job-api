import { Repository } from 'typeorm';
import { Seeker } from './entities/seeker.entity';
import { SeekerInterface } from "../Interfaces/Seeker.interface";
export declare class SeekerService {
    private seekerRepository;
    constructor(seekerRepository: Repository<Seeker>);
    setSeeker(seeker: SeekerInterface): Promise<Seeker>;
    findAll(): Promise<Seeker[]>;
    findOne(id: string): Promise<Seeker>;
    remove(id: string): Promise<any>;
}
