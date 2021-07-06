import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardEntity } from './entities/board.entity';
import { ColunmBoardEntity } from './entities/column_board.entity';
import { DatabaseBoardsStorage } from './store/database.boards.storage';
import { TasksModule } from 'src/tasks/tasks.module';

@Module({
  controllers: [BoardsController],
  providers: [
    BoardsService,
    { provide: 'BoardsStore', useClass: DatabaseBoardsStorage },
  ],
  imports: [
    TasksModule,
    TypeOrmModule.forFeature([BoardEntity, ColunmBoardEntity]),
  ],
})
export class BoardsModule {}
