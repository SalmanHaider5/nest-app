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
exports.MagazinesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const magazine_entity_1 = require("./magazine.entity");
let MagazinesService = class MagazinesService {
    constructor(magazineRepository) {
        this.magazineRepository = magazineRepository;
    }
    async findById(id) {
        return this.magazineRepository.findOne({ where: { id } });
    }
    async findAll() {
        return await this.magazineRepository.find({
            where: {
                deletedAt: null,
            }
        });
    }
    async create(createMagazineDto) {
        const magazine = new magazine_entity_1.Magazine();
        magazine.name = createMagazineDto.name;
        magazine.description = createMagazineDto.description;
        return await this.magazineRepository.save(magazine);
    }
    async softDelete(id) {
        const result = await this.magazineRepository.softDelete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Magazine with ID ${id} not found`);
        }
        return result;
    }
    async update(id, updateMagazineDto) {
        const existingMagazine = await this.magazineRepository.findOne({ where: { id } });
        if (!existingMagazine) {
            throw new common_1.NotFoundException(`Magazine with ID ${id} not found`);
        }
        return this.magazineRepository.save({ ...existingMagazine, ...updateMagazineDto });
    }
};
exports.MagazinesService = MagazinesService;
exports.MagazinesService = MagazinesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(magazine_entity_1.Magazine)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MagazinesService);
//# sourceMappingURL=magazines.service.js.map