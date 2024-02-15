// subscription.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not, IsNull } from 'typeorm';
import { Subscription } from './subscription.entity';
import { SubscribeDto } from './subscription.dto';
import { Magazine } from '../magazines/magazine.entity';
import { User } from '../users/user.entity';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(Subscription)
    private subscriptionRepository: Repository<Subscription>,
    @InjectRepository(Magazine)
    private magazineRepository: Repository<Magazine>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async subscribe(subscriptionDto: SubscribeDto): Promise<Subscription> {
    const { userId, magazineId } = subscriptionDto;
  
    // Check if the user exists
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
  
    // Check if the magazine exists
    const magazine = await this.magazineRepository.findOne({ where: { id: magazineId } });
    if (!magazine) {
      throw new NotFoundException('Magazine not found');
    }
  
    // Check if the user is already subscribed to the magazine
    const existingSubscription = await this.subscriptionRepository.findOne({
      where: { user: { id: userId }, magazine: { id: magazineId }, endDate: IsNull() }
    });
  
    if (existingSubscription) {
      throw new Error('User has already subscribed to this magazine');
    }
  
    // Check if the user has previously subscribed and update endDate and startDate accordingly
    const previousSubscription = await this.subscriptionRepository.findOne({
      where: { user: { id: userId }, magazine: { id: magazineId }, endDate: Not(IsNull()) }
    });
  
    if (previousSubscription) {
      previousSubscription.endDate = null;
      previousSubscription.startDate = new Date();
      await this.subscriptionRepository.save(previousSubscription);
      return previousSubscription;
    }
  
    // If no existing subscription found, create a new one
    const newSubscription = new Subscription();
    newSubscription.user = user;
    newSubscription.magazine = magazine;
    newSubscription.startDate = new Date();
    return this.subscriptionRepository.save(newSubscription);
  }

  async cancelSubscription(subscriptionId: number): Promise<void> {
    const subscription = await this.subscriptionRepository.findOne({ where: { id: subscriptionId  }});
    if (!subscription) {
      throw new NotFoundException('Subscription not found');
    }

    subscription.endDate = new Date();
    await this.subscriptionRepository.save(subscription);
  }

  async getCurrentSubscriptions(userId: number): Promise<any[]> {
    const subscriptions = await this.subscriptionRepository.find({
      where: { user: { id: userId }, endDate: IsNull() },
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

  async getPastSubscriptions(userId: number): Promise<any[]> {
    const subscriptions = await this.subscriptionRepository.find({
      where: { user: { id: userId }, endDate: Not(IsNull()) },
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
}
