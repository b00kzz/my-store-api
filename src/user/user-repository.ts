import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { type User } from './entities/user.entity';

@Injectable()
export class UserRepository extends Repository<User> {
    hello(): void {
        // eslint-disable-next-line no-console
        console.log('OK');
    }
}