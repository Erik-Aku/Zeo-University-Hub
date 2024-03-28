// Main server setup and configuration

const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');
const { authMiddleware } = require('./utils/auth');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
require('dotenv').config();

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
	typeDefs,
	resolvers
});

// Initialize and start the Apollo Server
const startApolloServer = async () => {
	await server.start();

	app.use(express.urlencoded({ extended: false }));
	app.use(express.json());

	// Apply the Apollo GraphQL middleware and pass the auth middleware
	app.use(
		'/graphql',
		expressMiddleware(server, {
			context: authMiddleware
		})
	);

	// Serve the React application in production
	if (process.env.NODE_ENV === 'production') {
		app.use(express.static(path.join(__dirname, '../client/dist')));

		app.get('*', (req, res) => {
			res.sendFile(path.join(__dirname, '../client/dist/index.html'));
		});
	}

	// Connect to the database and start the server
	db.once('open', () => {
		app.listen(PORT, () => {
			console.log(`API server running on port ${PORT}!`);
			console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
		});
	});
};

startApolloServer();
