const  { ApolloServer} = require('apollo-server')
const gql = require('graphql-tag');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const User = require('./models/userSchema');
const Post = require('./models/postSchema');

dotenv.config();

///DONE -> WORK
const typeDefs = require('./graphql/typeDefs');

const resolvers = require('./graphql/resolvers/index');

const server = new ApolloServer({typeDefs, resolvers});

const DB = process.env.MONGO_URL.replace('<password>',process.env.MONGO_PASS);
mongoose.connect(DB).then(()=>{
    console.log('Database is connected')
})
server.listen({ port : 8000}).then(()=>{
    console.log('server listening on port')
})