import { Repository } from 'typeorm';
import { Subscription } from './subscription.entity';
import { SubscribeDto } from './subscription.dto';
import { Magazine } from '../magazines/magazine.entity';
import { User } from '../users/user.entity';
export declare class SubscriptionService {
    private subscriptionRepository;
    private magazineRepository;
    private userRepository;
    constructor(subscriptionRepository: Repository<Subscription>, magazineRepository: Repository<Magazine>, userRepository: Repository<User>);
    subscribe(subscriptionDto: SubscribeDto): Promise<Subscription>;
    cancelSubscription(subscriptionId: number): Promise<void>;
    getCurrentSubscriptions(userId: number): Promise<any[]>;
    getPastSubscriptions(userId: number): Promise<any[]>;
}
