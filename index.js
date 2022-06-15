const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers/index')
const { MONGODB } = require('./config.js')

const PORT = process.env.port || 3030

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req })
});


const startServer = async () => {
    try {
        await mongoose.connect(MONGODB, {
            useNewUrlParser: true
        })
        const serverInit = await server.listen({ port: PORT })
        console.log(`Server running at ${serverInit.url}`)
    } catch (err) {
        console.error(err)
    }
}

startServer()