import TransportStream from 'winston-transport';
import { Signale } from 'signale';
import { MESSAGE } from 'triple-beam';

const signale = new Signale({
  types: {
    verbose: {
      badge: 'v',
      label: 'verbose',
      color: 'gray',
    },
    silly: {
      badge: ' ',
      label: 'silly',
      color: 'gray',
    },
  },
});
signale.config({ displayTimestamp: true });

class SignaleTransport extends TransportStream {
  constructor(opts) {
    super(opts);
    this.streams = {
      SERVER: signale.scope('-server--'),
      REQUEST: signale.scope('-request-'),
    };
  }

  log = (info, cb) => {
    const log = JSON.parse(info[MESSAGE]);
    this.streams[log.type][log.level.toLowerCase()](log.log);
    cb();
  }
}

export default SignaleTransport;
