"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const client_entity_1 = require("./entities/client.entity");
const image_service_1 = require("../image/image.service");
const ulidx_1 = require("ulidx");
let ClientService = class ClientService {
    constructor(clientRepository, imageService) {
        this.clientRepository = clientRepository;
        this.imageService = imageService;
    }
    async setClient(client) {
        const clientSaved = await this.clientRepository.save(Object.assign({ id: (0, ulidx_1.ulid)() }, client));
        const clientId = clientSaved.id;
        const clientImage = await this.imageService.findById(clientId);
        return Object.assign(Object.assign({}, client), { images: clientImage !== null ? clientImage : [] });
    }
    async findAll() {
        const clients = (await this.clientRepository.find({
            order: {
                id: 'DESC',
            },
        }));
        const clientImg = [];
        for (const client of clients) {
            const clientId = client.id;
            const clientImage = await this.imageService.findById(clientId);
            const data = Object.assign(Object.assign({}, client), { images: clientImage !== null ? clientImage : [] });
            clientImg.push(data);
        }
        return clientImg;
    }
    async findOne(id) {
        const client = await this.clientRepository.findOneBy({ id });
        const clientImage = await this.imageService.findById(client.id);
        return Object.assign(Object.assign({}, client), { images: clientImage !== null ? clientImage : [] });
    }
    async remove(id) {
        const client = await this.clientRepository.findOneBy({ id });
        const clientId = client.id;
        const clientImage = await this.imageService.findById(clientId);
        for (const img of clientImage) {
            await this.imageService.remove(img.id);
        }
        return await this.clientRepository.delete(id);
    }
};
ClientService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(client_entity_1.Client)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        image_service_1.ImageService])
], ClientService);
exports.ClientService = ClientService;
//# sourceMappingURL=client.service.js.map