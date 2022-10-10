import { StreamableFile } from '@nestjs/common';
import { AppService } from './app.service';
import type { NextFunction, Response as ResponseType } from 'express';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getWelcome(): string;
    handleStreamFile(param: any, res: ResponseType, header: any, ip: any, next: NextFunction): Promise<StreamableFile>;
}
