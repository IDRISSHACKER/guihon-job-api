import { Repository } from 'typeorm';
import { Presence } from './entities/presence.entity';
export declare class PresenceService {
    private presenceRepository;
    constructor(presenceRepository: Repository<Presence>);
    setPresence(presence: Presence): Promise<any>;
    findAll(): Promise<Presence[]>;
    findOne(id: string): Promise<Presence>;
    findByUser(id: string): Promise<Presence>;
    update(id: string): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<any>;
}
