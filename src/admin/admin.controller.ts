import {
  Controller,
  Get,
  Param,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import {Admin} from "./entities/admin.entity";


@Controller('admin')
export class AdminController {
  constructor(private readonly formatsService: AdminService) {}


  @Get(':id')
  findOne(@Param('id') id: string): Promise<Admin> {
    return this.formatsService.findOne(id);
  }

}
