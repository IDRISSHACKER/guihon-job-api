import { BaseEntity } from 'typeorm';
import { Client } from "../../client/entities/client.entity";
import { Tache } from "../../tache/entities/tache.entity";
export declare class Planing extends BaseEntity {
    id?: string;
    clientId: string;
    rewindDay: number;
    prix: number;
    updated_at?: Date;
    created_at?: Date;
    client: Client;
    taches: Tache[];
}
