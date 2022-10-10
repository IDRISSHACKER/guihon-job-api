import { Repository } from 'typeorm';
import { Admin } from "./entities/admin.entity";
export declare class AdminService {
    private adminRepository;
    constructor(adminRepository: Repository<Admin>);
    findOne(id: string): Promise<Admin>;
}
