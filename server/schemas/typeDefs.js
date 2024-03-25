const typeDefs = `
type User {
    _id: ID!
    username: String
    email: String
    password: String
    savedColleges: [College]
    
}

type College {
    collegeId: ID!
    name: String
    city: String
    state: String
    size: Int
}

input InputCollege{
    collegeId: String!
    name: String
    city: String
    state: String
    size: Int
}

type Auth {
    token: ID!
    user: User
}

type Query {
      me: User
      searchColleges(query: String!): [College]
}

type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveCollege(newCollege: InputCollege!): User
    removeCollege(collegeId: ID!): User
}
`;

module.exports = typeDefs;
