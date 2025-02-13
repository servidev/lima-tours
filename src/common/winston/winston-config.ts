import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import * as winston from 'winston';
import { format } from 'date-fns';

export const winstonConfig = {
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp({
          format: () => format(new Date(), 'dd-MM-yyyy HH:mm:ss'),
        }),
        nestWinstonModuleUtilities.format.nestLike(),
      ),
    }),
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
      format: winston.format.combine(
        winston.format.timestamp({
          format: () => format(new Date(), 'dd-MM-yyyy HH:mm:ss'),
        }),
        winston.format.json(),
      ),
    }),
  ],
};
