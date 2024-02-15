import { User } from '../users/user.entity';
import { Magazine } from '../magazines/magazine.entity';
export declare class Subscription {
    id: number;
    user: User;
    magazine: Magazine;
    startDate: Date;
    endDate: Date;
}
