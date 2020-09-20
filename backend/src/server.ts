import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import depthLimit from 'graphql-depth-limit';
import { createServer } from 'http';
import compression from 'compression';
import cors from 'cors';
import schema from './schema';
import dotenv from 'dotenv';

dotenv.config()

const app = express();
const server = new ApolloServer({
  schema,
  validationRules: [depthLimit(7)],
  formatError: (err) => {
    if (!err.originalError) {
      return err;
    }
    // FUTURE REFERENCE: format error here when to change error details
    return err
  }
});
app.use('*', cors());
app.use(compression());
server.applyMiddleware({ app, path: '/graphql' });
const httpServer = createServer(app);
httpServer.listen(
  { port: 3000 },
  (): void => console.log(`\n🚀      GraphQL is now running on http://localhost:3000/graphql`));