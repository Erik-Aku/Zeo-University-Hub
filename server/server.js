import express, { urlencoded, json, static as expressStatic } from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { join } from 'path';
import { authMiddleware } from './utils/auth';

import { typeDefs, resolvers } from './schemas';
import { once } from './config/connection';

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  await server.start();

  app.use(urlencoded({ extended: false }));
  app.use(json());

  app.use('/graphql', expressMiddleware(server, {
    context: authMiddleware
  }));

  if (process.env.NODE_ENV === 'production') {
    app.use(expressStatic(join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
      res.sendFile(join(__dirname, '../client/dist/index.html'));
    });
  }

  once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

// Call the async function to start the server
  startApolloServer();
