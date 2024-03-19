const typeDefs = `
type User {
    _id: ID!
    username: String
    email: String
    password:string
    colleges:[College]
    
}
type College {
  collegeId :ID!
  name: [String]
  tuition: String
  size: Int
  degrees: String
  city: String
  state:String
  admissions:String
}

input InputCollege{
  collegeId :String!
  name: [String]
  tuition: String
  size: Int
  degrees: String
  city: String
  state:String
  admissions:String

}
type Auth {
    token: ID!
    user: User
  }


type Query {
      me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addCollege(newCollege: InputCollege!): User
    removeCollege(collegeId: ID!): User
  }
`;

module.exports = typeDefs;
