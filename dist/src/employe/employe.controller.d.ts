import { EmployeService } from './employe.service';
import { Employe } from './entities/employe.entity';
import { LoginInterace } from '../Interfaces/Login.interace';
export declare class EmployeController {
    private readonly employeService;
    constructor(employeService: EmployeService);
    handleRequestAllSekers(): Promise<Employe[]>;
    handleRequestLoginInfo(token: string): Promise<any>;
    index(employeID: any): Promise<Employe>;
    handleSaveEmploye(req: any, body: Employe): Promise<any>;
    handleDeleteFile(param: any): Promise<void>;
    handleLogin(userReq: LoginInterace): Promise<any>;
}
