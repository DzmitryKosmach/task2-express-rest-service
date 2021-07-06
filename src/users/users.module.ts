import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
// import { DatabaseUsersStorage } from './store/database.users.storage';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { DatabaseUsersStorage } from './store/database.users.storage';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    { provide: 'UsersStore', useClass: DatabaseUsersStorage },
  ],
  imports: [TypeOrmModule.forFeature([UserEntity])],
  exports: [UsersService],
})
export class UsersModule {}
