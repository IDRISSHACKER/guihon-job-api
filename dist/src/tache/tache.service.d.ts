import { Repository } from 'typeorm';
import { Tache } from "./entities/tache.entity";
import { PlaningService } from "../planing/planing.service";
import { EmployetacheService } from "../employetache/employetache.service";
import { EmployeService } from "../employe/employe.service";
export declare class TacheService {
    private readonly tacheRepository;
    private readonly planingService;
    private readonly employeTacheService;
    private readonly employeService;
    constructor(tacheRepository: Repository<Tache>, planingService: PlaningService, employeTacheService: EmployetacheService, employeService: EmployeService);
    setTache(tache: any): Promise<any>;
    findAll(): Promise<Tache[]>;
    findOne(id: string): Promise<any>;
    remove(id: string): Promise<any>;
}
