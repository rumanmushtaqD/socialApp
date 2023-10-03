const postQueryMutat = require("./postResolvers");
const userQueryMutat = require("./userResolvers");
const resolvers = {
  Query: {
    ...postQueryMutat.Query,
    ...userQueryMutat.Query,
  },
  Mutation : {
    ...userQueryMutat.Mutation
  }
};
module.exports = resolvers;
