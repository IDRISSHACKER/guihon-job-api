import { ClientService } from './client.service';
import { Client } from './entities/client.entity';
export declare class ClientController {
    private readonly clientService;
    constructor(clientService: ClientService);
    handleRequestAllSekers(): Promise<any>;
    index(clientId: any): Promise<Client>;
    handleDeleteFile(param: any): Promise<void>;
    handleUploadFile(req: any, body: Client): Promise<any>;
}
