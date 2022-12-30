import { BaseEntity } from 'typeorm';
import { Tache } from "../../tache/entities/tache.entity";
export declare class Employetache extends BaseEntity {
    id: string;
    userId: string;
    tacheId: string;
    isAdmin?: boolean;
    updated_at: Date;
    created_at: Date;
    taches: Tache[];
}
