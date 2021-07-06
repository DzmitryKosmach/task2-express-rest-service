import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from './entities/task.entity';
import { DatabaseTasksStorage } from './store/database.tasks.storage';

@Module({
  controllers: [TasksController],
  providers: [
    TasksService,
    { provide: 'TasksStore', useClass: DatabaseTasksStorage },
  ],
  imports: [TypeOrmModule.forFeature([TaskEntity])],
  exports: [TasksService],
})
export class TasksModule {}
