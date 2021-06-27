import express, { Application, Request, Response, NextFunction } from "express";
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';
import {ReasonPhrases, StatusCodes} from 'http-status-codes';

import {morganMiddleware, Logger} from './common/logger/morganMiddleware'
import loginRouter from './resources/login/login.router';
import userRouter from './resources/users/user.router';
import boardRouter from './resources/boards/board.router';
import taskRouter from './resources/tasks/task.router';
import HttpException from './exceptions/httpexception';
import { authMiddleware } from './common/auth/checkToken';



const app: Application = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());
app.use(morganMiddleware);

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req: Request, res: Response, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/login', loginRouter);

// app.use(authMiddleware);
app.use('/users', authMiddleware, userRouter);
app.use('/boards', authMiddleware, boardRouter);
app.use('/boards/:boardId/tasks', authMiddleware, taskRouter);

app.use((err: HttpException, req:Request, res: Response, next: NextFunction) => {
  if(err.status) {
    Logger.error(`${req.method} - ${err.status} - ${err.message}  - ${req.originalUrl}`);  
    res.status(err.status);
    res.send(err.message); 
  } else {
    Logger.error(ReasonPhrases.INTERNAL_SERVER_ERROR, err, err.stack);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ReasonPhrases.INTERNAL_SERVER_ERROR);
  }
  next();
});

process.on('uncaughtException', (error) => {
  Logger.error(`The uncaughtException. ${error}`, () =>
      process.exit(1)
  );
});

process.on('unhandledRejection', (error) => {
  Logger.error(`The unhandledRejection. ${error}`);
});

export default app;
