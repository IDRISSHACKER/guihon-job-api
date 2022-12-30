import { Employetache } from "./entities/employetache.entity";
import { EmployetacheService } from "./employetache.service";
export declare class EmployetacheController {
    private readonly employeTacheService;
    constructor(employeTacheService: EmployetacheService);
    handleRequestAllEmployeTache(): Promise<Employetache[]>;
    index(id: any): Promise<Employetache>;
    handleDeleteEmployeTache(id: any, userId: any): Promise<void>;
    handleSetEmployeTache(req: any, employeTache: Employetache): Promise<any>;
}
