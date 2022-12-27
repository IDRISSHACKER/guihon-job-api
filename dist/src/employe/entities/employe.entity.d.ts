import { BaseEntity } from 'typeorm';
import { Presence } from '../../presence/entities/presence.entity';
export declare class Employe extends BaseEntity {
    id: string;
    nom: string;
    prenom: string;
    cni?: string;
    email: string;
    tel: string;
    avatar?: string;
    basesalary?: string;
    secret?: string;
    isAdmin?: boolean;
    isSecretary?: boolean;
    token?: string;
    refreshToken?: string;
    updated_at: Date;
    created_at: Date;
    presences: Presence;
}
