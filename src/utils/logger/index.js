import { format, transports, createLogger } from 'winston';

import SignaleTransport from './transports/signale';
import { isProduction, isLocalEnv } from '../env';

export default () => {
  const options = {
    format: format.combine(
      format.timestamp(),
    ),
    level: isProduction() ? 'info' : 'debug',
    handleExceptions: false,
  };
  const log = createLogger({
    transports: [
      isLocalEnv()
        ? new SignaleTransport(options)
        : new transports.Console(options),
    ],
  });
  return log;
};
