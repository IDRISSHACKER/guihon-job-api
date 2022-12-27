/// <reference types="multer" />
import { StreamableFile } from '@nestjs/common';
import { ImageService } from './image.service';
import { Image } from './entities/image.entity';
import type { Response as ResponseType } from 'express';
export declare class ImageController {
    private readonly imageService;
    constructor(imageService: ImageService);
    handleRequestAllSekers(): Promise<Image[]>;
    index(image: any, res: ResponseType): Promise<StreamableFile>;
    handleDeleteFile(param: any): Promise<void>;
    handleUploadFile(file: Express.Multer.File, req: any, param: Image): Promise<Image>;
}
