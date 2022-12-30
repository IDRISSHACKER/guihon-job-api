import { PlaningService } from "./planing.service";
import { Planing } from "./entities/planing.entity";
export declare class PlaningController {
    private readonly planingService;
    constructor(planingService: PlaningService);
    handleRequestAllPlanings(): Promise<Planing[]>;
    index(id: any): Promise<Planing>;
    handleSavePlaning(req: any, body: Planing): Promise<any>;
    handleDeletePlaning(id: any): Promise<void>;
}
