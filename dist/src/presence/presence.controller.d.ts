import { PresenceService } from './presence.service';
import { Presence } from './entities/presence.entity';
export declare class PresenceController {
    private readonly presenceService;
    constructor(presenceService: PresenceService);
    handleRequestAllSekers(): Promise<Presence[]>;
    index(id: any): Promise<Presence>;
    handleDeleteFile(param: any): Promise<void>;
    handleSetPresence(req: any, presence: Presence): Promise<any>;
    handleUpdatePresence(req: any, presenceId: string): Promise<import("typeorm").UpdateResult>;
}
