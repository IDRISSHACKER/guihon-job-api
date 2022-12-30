import { Tache } from "./entities/tache.entity";
import { TacheService } from "./tache.service";
export declare class TacheController {
    private readonly tacheService;
    constructor(tacheService: TacheService);
    handleRequestAllTache(): Promise<Tache[]>;
    index(id: any): Promise<Tache>;
    handleSaveTache(req: any, body: Tache): Promise<any>;
    handleDeleteTache(id: any): Promise<void>;
}
