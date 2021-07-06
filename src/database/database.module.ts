import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardEntity } from 'src/boards/entities/board.entity';
import { ColunmBoardEntity } from 'src/boards/entities/column_board.entity';
import { TaskEntity } from 'src/tasks/entities/task.entity';
import { UserEntity } from 'src/users/entities/user.entity';

require('dotenv').config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASWORD,
      database: process.env.DB_NAME,
      logging: true,
      entities: [UserEntity, TaskEntity, BoardEntity, ColunmBoardEntity],
      //entities: ['srs/**/entities/*.ts', 'build/**/entities/*.js'],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
