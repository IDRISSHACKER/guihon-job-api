import { BaseEntity } from 'typeorm';
import { Employe } from '../../employe/entities/employe.entity';
export declare class Presence extends BaseEntity {
    id: string;
    userId: string;
    ended?: boolean;
    updated_at: Date;
    created_at: Date;
    user: Employe;
}
