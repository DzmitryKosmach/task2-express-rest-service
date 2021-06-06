import app from './app';
import Logger from "./common/logger/logger";
import {PORT} from './common/config';

app.listen(PORT, () =>
Logger.info(`App is running on http://localhost:${PORT}`)
);
