import morgan, { StreamOptions } from "morgan";
import {Request, Response}  from 'express';

import Logger from "./logger";

const stream: StreamOptions = {  
  write: (message) => Logger.http(message),  
};

const skip = () => {
  const {NODE_ENV} =  process.env; 
  const env = NODE_ENV || "development";
  return env !== "development";
};

morgan.token("queryParams", (req: Request) =>      
  `queryParams: ${JSON.stringify(req.query)}`
)

morgan.token("params", (req: Request) =>      
  `pathParams: ${JSON.stringify(req.params)}`
)

morgan.token("body", (req: Request) =>      
  `body: ${JSON.stringify(req.body)}`
)

morgan.token("status", (_req: Request, res: Response) =>      
  `statusCode: ${res.statusCode}`
)

const morganMiddleware = morgan(  
  ":method :url :queryParams :params :body :status",  
  { stream, skip }
);

export {morganMiddleware, Logger};