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
exports.SubscriptionController = void 0;
const common_1 = require("@nestjs/common");
const subscriptions_service_1 = require("./subscriptions.service");
const subscription_dto_1 = require("./subscription.dto");
let SubscriptionController = class SubscriptionController {
    constructor(subscriptionService) {
        this.subscriptionService = subscriptionService;
    }
    async subscribe(subscriptionDto) {
        try {
            const subscription = await this.subscriptionService.subscribe(subscriptionDto);
            return subscription;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.HttpException(error.message, common_1.HttpStatus.NOT_FOUND);
            }
            else if (error.message === 'User has already subscribed to this magazine') {
                throw new common_1.HttpException(error.message, common_1.HttpStatus.CONFLICT);
            }
            else {
                throw new common_1.HttpException('Internal Server Error', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
    async cancelSubscription(subscriptionId) {
        await this.subscriptionService.cancelSubscription(subscriptionId);
        return { message: 'Subscription cancelled successfully' };
    }
    async getCurrentSubscriptions(userId) {
        return this.subscriptionService.getCurrentSubscriptions(userId);
    }
    async getPastSubscriptions(userId) {
        return this.subscriptionService.getPastSubscriptions(userId);
    }
};
exports.SubscriptionController = SubscriptionController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [subscription_dto_1.SubscribeDto]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "subscribe", null);
__decorate([
    (0, common_1.Delete)(':subscriptionId'),
    __param(0, (0, common_1.Param)('subscriptionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "cancelSubscription", null);
__decorate([
    (0, common_1.Get)('current/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "getCurrentSubscriptions", null);
__decorate([
    (0, common_1.Get)('past/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "getPastSubscriptions", null);
exports.SubscriptionController = SubscriptionController = __decorate([
    (0, common_1.Controller)('subscriptions'),
    __metadata("design:paramtypes", [subscriptions_service_1.SubscriptionService])
], SubscriptionController);
//# sourceMappingURL=subscriptions.controller.js.map