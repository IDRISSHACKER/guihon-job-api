import { BaseEntity } from 'typeorm';
import { Image } from '../../image/entities/image.entity';
export declare class Client extends BaseEntity {
    id: string;
    nom: string;
    prenom: string;
    email?: string;
    tel: string;
    avatar?: string;
    lieux?: string;
    updated_at: Date;
    created_at: Date;
    images: Image[];
}
