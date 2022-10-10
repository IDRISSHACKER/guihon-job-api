/// <reference types="multer" />
import { SeekerService } from './seeker.service';
import { SeekerBody } from "../Interfaces/Seeker.interface";
import { Seeker } from "./entities/seeker.entity";
export declare class SeekerController {
    private readonly seekerService;
    constructor(seekerService: SeekerService);
    handleRequestAllSekers(): Promise<Seeker[]>;
    index(seekerID: any): Promise<Seeker>;
    handleUploadFile(file: Express.Multer.File, req: any, body: SeekerBody): Promise<Seeker>;
    handleDeleteFile(param: any): Promise<void>;
}
