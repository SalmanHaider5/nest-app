import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriptionController } from './subscriptions.controller';
import { SubscriptionService } from './subscriptions.service';
import { Subscription } from './subscription.entity';
import { User } from '../users/user.entity';
import { Magazine } from '../magazines/magazine.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Subscription, User, Magazine])],
  controllers: [SubscriptionController],
  providers: [SubscriptionService],
  exports: [SubscriptionService],
})
export class SubscribersModule {}