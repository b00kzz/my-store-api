import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { userProviders } from './user-provider';
import { DatabaseModule } from 'src/configs/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [...userProviders],
  exports: [UserService],
})
export class UserModule { }
