import app from './app';
import Logger from "./common/logger/logger";
import {PORT} from './common/config';
import { TryDBConnect } from './common/helpers/db';
import { createUserAdmin } from './resources/users/user.repository';

TryDBConnect(() => {
  app.listen(PORT, () => {
      Logger.info(`App is running on http://localhost:${PORT}`);
      createUserAdmin();   
  });
});




