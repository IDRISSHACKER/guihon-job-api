import { Repository } from 'typeorm';
import { Employe } from './entities/employe.entity';
import { LoginInterace } from '../Interfaces/Login.interace';
import { PresenceService } from '../presence/presence.service';
export declare class EmployeService {
    private readonly employeRepository;
    private readonly presenceService;
    constructor(employeRepository: Repository<Employe>, presenceService: PresenceService);
    setEmploye(employe: Employe): Promise<any>;
    findAll(): Promise<any>;
    findOne(id: string): Promise<any>;
    findUser(user: LoginInterace): Promise<Employe>;
    remove(id: string): Promise<any>;
}
