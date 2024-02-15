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
exports.SubscriptionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const subscription_entity_1 = require("./subscription.entity");
const magazine_entity_1 = require("../magazines/magazine.entity");
const user_entity_1 = require("../users/user.entity");
let SubscriptionService = class SubscriptionService {
    constructor(subscriptionRepository, magazineRepository, userRepository) {
        this.subscriptionRepository = subscriptionRepository;
        this.magazineRepository = magazineRepository;
        this.userRepository = userRepository;
    }
    async subscribe(subscriptionDto) {
        const { userId, magazineId } = subscriptionDto;
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const magazine = await this.magazineRepository.findOne({ where: { id: magazineId } });
        if (!magazine) {
            throw new common_1.NotFoundException('Magazine not found');
        }
        const existingSubscription = await this.subscriptionRepository.findOne({
            where: { user: { id: userId }, magazine: { id: magazineId }, endDate: (0, typeorm_2.IsNull)() }
        });
        if (existingSubscription) {
            throw new Error('User has already subscribed to this magazine');
        }
        const previousSubscription = await this.subscriptionRepository.findOne({
            where: { user: { id: userId }, magazine: { id: magazineId }, endDate: (0, typeorm_2.Not)((0, typeorm_2.IsNull)()) }
        });
        if (previousSubscription) {
            previousSubscription.endDate = null;
            previousSubscription.startDate = new Date();
            await this.subscriptionRepository.save(previousSubscription);
            return previousSubscription;
        }
        const newSubscription = new subscription_entity_1.Subscription();
        newSubscription.user = user;
        newSubscription.magazine = magazine;
        newSubscription.startDate = new Date();
        return this.subscriptionRepository.save(newSubscription);
    }
    async cancelSubscription(subscriptionId) {
        const subscription = await this.subscriptionRepository.findOne({ where: { id: subscriptionId } });
        if (!subscription) {
            throw new common_1.NotFoundException('Subscription not found');
        }
        subscription.endDate = new Date();
        await this.subscriptionRepository.save(subscription);
    }
    async getCurrentSubscriptions(userId) {
        const subscriptions = await this.subscriptionRepository.find({
            where: { user: { id: userId }, endDate: (0, typeorm_2.IsNull)() },
            relations: ['magazine', 'user'],
        });
        return subscriptions.map(subscription => ({
            id: subscription.id,
            userId: subscription.user.id,
            magazineId: subscription.magazine.id,
            magazine: subscription.magazine.name,
            startDate: subscription.startDate,
            endDate: subscription.endDate,
        }));
    }
    async getPastSubscriptions(userId) {
        const subscriptions = await this.subscriptionRepository.find({
            where: { user: { id: userId }, endDate: (0, typeorm_2.Not)((0, typeorm_2.IsNull)()) },
            relations: ['magazine', 'user'],
        });
        return subscriptions.map(subscription => ({
            id: subscription.id,
            userId: subscription.user.id,
            magazineId: subscription.magazine.id,
            magazine: subscription.magazine.name,
            startDate: subscription.startDate,
            endDate: subscription.endDate,
        }));
    }
};
exports.SubscriptionService = SubscriptionService;
exports.SubscriptionService = SubscriptionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(subscription_entity_1.Subscription)),
    __param(1, (0, typeorm_1.InjectRepository)(magazine_entity_1.Magazine)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], SubscriptionService);
//# sourceMappingURL=subscriptions.service.js.map