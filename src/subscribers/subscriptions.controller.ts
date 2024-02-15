
import { Controller, Post, Body, Param, Delete, Get, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { SubscriptionService } from './subscriptions.service';
import { SubscribeDto } from './subscription.dto';

@Controller('subscriptions')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post()
  async subscribe(@Body() subscriptionDto: SubscribeDto) {
    try {
      const subscription = await this.subscriptionService.subscribe(subscriptionDto);
      return subscription;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      } else if (error.message === 'User has already subscribed to this magazine') {
        throw new HttpException(error.message, HttpStatus.CONFLICT);
      } else {
        throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  @Delete(':subscriptionId')
  async cancelSubscription(@Param('subscriptionId') subscriptionId: number) {
    await this.subscriptionService.cancelSubscription(subscriptionId);
    return { message: 'Subscription cancelled successfully' };
  }

  @Get('current/:userId')
  async getCurrentSubscriptions(@Param('userId') userId: number) {
    return this.subscriptionService.getCurrentSubscriptions(userId);
  }

  @Get('past/:userId')
  async getPastSubscriptions(@Param('userId') userId: number) {
    return this.subscriptionService.getPastSubscriptions(userId);
  }
}
