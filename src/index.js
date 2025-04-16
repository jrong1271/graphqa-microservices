// index.js
const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { json } = require('body-parser');
require('dotenv').config();

const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const startServer = async () => {
  const app = express();

  // ✅ Body parser comes first
  app.use(json()); // Ensure JSON middleware is set up before Apollo Server middleware

  // Initialize Apollo Server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await server.start();

  // Apply Apollo Server middleware
  app.use('/graphql', expressMiddleware(server));

  app.listen(4000, () => {
    console.log('🚀 Server running at http://localhost:4000/graphql');
  });
};

startServer();