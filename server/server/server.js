// server.js
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./graphql/schema') // Define your GraphQL schema
const resolvers = require('./src/graphql/resolvers') // Define your resolvers
const express = require('express');
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');
const { authenticateUser } = require('./src/middelware/auth');
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  context: ({ req }) => {
    let user = authenticateUser(req)
    console.log(user);
    return {
      currentUser: user
    }
  },
});

async function startServer() {
    await server.start();
    server.applyMiddleware({ app });
  
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  }
  
  startServer();
