import { Repository } from 'typeorm';
import { Employetache } from "./entities/employetache.entity";
export declare class EmployetacheService {
    private employeTacheRepository;
    constructor(employeTacheRepository: Repository<Employetache>);
    setEmployeTache(employeTache: Employetache): Promise<any>;
    findAll(): Promise<Employetache[]>;
    findOne(id: string): Promise<Employetache>;
    findByTache(id: string): Promise<Employetache[]>;
    remove(tacheId: string, userId: string): Promise<any>;
}
