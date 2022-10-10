import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  welcomeToCinafFile(): string {
    return 'Guihon job api!';
  }

}
