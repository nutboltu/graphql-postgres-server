import express from 'express';
import { ApolloServer } from 'apollo-server-express';

import helmet from 'helmet';
import bodyParser from 'body-parser';
import depthLimit from 'graphql-depth-limit';

import schemas from './utils/schemas';
import context from './utils/context';
import { HOST, PORT, isLocalEnv } from './utils/env';

import { setCSP } from './security/csp';
import { setFeaturePolicy } from './security/featurePolicy';

(async function main() {
  const app = express();
  app.use(bodyParser.json({ limit: '1mb' }));

  /**
   * Security Setup includes
   *  - Cross site scripting
   *  - Feature policy
   *  - Cross domain policy
   *  - Referrer policy
   *  - Content-type options: nosniff
   */
  app.use(helmet());
  if (!isLocalEnv()) {
    app.use(setCSP());
  }
  app.use(setFeaturePolicy());
  app.use(helmet.permittedCrossDomainPolicies());
  app.use(helmet.referrerPolicy({ policy: 'same-origin' }));
  app.use(helmet.noSniff());

  const server = new ApolloServer({
    schema: schemas,
    context,
    playground: isLocalEnv(),
    validationRules: [depthLimit(5)],
  });
  server.applyMiddleware({ app });

  const port = PORT;
  const host = HOST;
  app.listen({ port, host }, () => {
    // eslint-disable-next-line no-console
    console.info('READY! 🚀');
    // eslint-disable-next-line no-console
    console.info(`${host}:${port}${server.graphqlPath}`);
  });
}());
