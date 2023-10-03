const gql = require("graphql-tag");
const typeDefs = gql`
type Post {
    id : ID!
    body : String!
    createdAt : String!
    username : String!
    comment : String!
}
type User {
    id : ID!
    username : String!
    token : String!
    email : String!
    createdAt : String!
}
input RegisterInput{
    username : String!
    password : String!
    confirmedPassword : String!
    email : String!
}
type LoginInput{
    email : String!
    password : String!
}
type Query {
    getPosts : [Post]
    getPost(postId : ID!) : Post!
    getUsers : [User]
    getUser(userId : ID!) : User!
}
type Mutation {
    register(registerInput : RegisterInput) : User!
    login(loginInput : LoginInput) : User!
    createUser(createUserInput : RegisterInput) : User!
    deleteUser(userId : ID!) : User!
}`;

module.exports = typeDefs;
