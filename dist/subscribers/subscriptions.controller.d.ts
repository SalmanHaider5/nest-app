import { SubscriptionService } from './subscriptions.service';
import { SubscribeDto } from './subscription.dto';
export declare class SubscriptionController {
    private readonly subscriptionService;
    constructor(subscriptionService: SubscriptionService);
    subscribe(subscriptionDto: SubscribeDto): Promise<import("./subscription.entity").Subscription>;
    cancelSubscription(subscriptionId: number): Promise<{
        message: string;
    }>;
    getCurrentSubscriptions(userId: number): Promise<any[]>;
    getPastSubscriptions(userId: number): Promise<any[]>;
}
