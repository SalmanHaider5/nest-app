import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MagazinesModule } from './magazines/magazines.module';
import { SubscribersModule } from './subscribers/subscriptions.module';
import { User } from './users/user.entity';
import { Magazine } from './magazines/magazine.entity';
import { Subscription } from './subscribers/subscription.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'salman',
      password: 'abc_123',
      database: 'assignment',
      entities: [User, Magazine, Subscription],
      synchronize: true,
    }),
    UsersModule,
    MagazinesModule,
    SubscribersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
