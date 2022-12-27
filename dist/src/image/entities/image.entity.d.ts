import { BaseEntity } from 'typeorm';
import { Client } from '../../client/entities/client.entity';
export declare class Image extends BaseEntity {
    id: string;
    path: string;
    clientId: string;
    updated_at: Date;
    created_at: Date;
    client: Client;
}
