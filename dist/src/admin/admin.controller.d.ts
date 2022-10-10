import { AdminService } from './admin.service';
import { Admin } from "./entities/admin.entity";
export declare class AdminController {
    private readonly formatsService;
    constructor(formatsService: AdminService);
    findOne(id: string): Promise<Admin>;
}
