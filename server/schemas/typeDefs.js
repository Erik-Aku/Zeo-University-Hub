const typeDefs = `
type User {
    _id: ID!
    username: String!
    email: String!
    
}

type Query {
    me: User
}

`

module.exports = typeDefs;