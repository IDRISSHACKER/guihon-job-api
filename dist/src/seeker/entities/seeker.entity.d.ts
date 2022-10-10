import { BaseEntity } from 'typeorm';
export declare class Seeker extends BaseEntity {
    id: string;
    name: string;
    surname: string;
    is_taked?: boolean;
    age: number;
    phone: string;
    cni: string;
    sex: string;
    cv: string;
    avatar: string;
    updated_at: Date;
    created_at: Date;
}
