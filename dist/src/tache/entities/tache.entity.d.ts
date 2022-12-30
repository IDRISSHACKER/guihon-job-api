import { BaseEntity } from 'typeorm';
import { Planing } from "../../planing/entities/planing.entity";
import { Employetache } from "../../employetache/entities/employetache.entity";
export declare class Tache extends BaseEntity {
    id?: string;
    title?: string;
    planingId: string;
    ended?: boolean;
    rapport?: string;
    startImg?: string;
    start_at?: string;
    endImg?: string;
    ended_at?: string;
    updated_at: Date;
    created_at: Date;
    planing: Planing;
    employestaches: Employetache[];
}
