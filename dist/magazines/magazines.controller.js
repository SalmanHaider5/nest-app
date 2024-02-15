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
exports.MagazinesController = void 0;
const common_1 = require("@nestjs/common");
const magazine_dto_1 = require("./magazine.dto");
const magazines_service_1 = require("./magazines.service");
let MagazinesController = class MagazinesController {
    constructor(magazinesService) {
        this.magazinesService = magazinesService;
    }
    async findAll() {
        return this.magazinesService.findAll();
    }
    async findById(id) {
        const magazine = await this.magazinesService.findById(id);
        if (!magazine) {
            throw new common_1.NotFoundException(`Magazine with ID ${id} not found`);
        }
        return magazine;
    }
    async create(createMagazineDto) {
        return this.magazinesService.create(createMagazineDto);
    }
    async update(id, updateMagazineDto) {
        return this.magazinesService.update(id, updateMagazineDto);
    }
    async softDelete(id) {
        const result = await this.magazinesService.softDelete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Magazine with ID ${id} not found`);
        }
    }
};
exports.MagazinesController = MagazinesController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MagazinesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MagazinesController.prototype, "findById", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [magazine_dto_1.CreateMagazineDto]),
    __metadata("design:returntype", Promise)
], MagazinesController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, magazine_dto_1.UpdateMagazineDto]),
    __metadata("design:returntype", Promise)
], MagazinesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MagazinesController.prototype, "softDelete", null);
exports.MagazinesController = MagazinesController = __decorate([
    (0, common_1.Controller)('magazines'),
    __metadata("design:paramtypes", [magazines_service_1.MagazinesService])
], MagazinesController);
//# sourceMappingURL=magazines.controller.js.map