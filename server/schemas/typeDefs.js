const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String
    email: String,
    bookCount: Int,
    savedBooks: [Book]
  }
  type Book {
    _id: ID!
    bookId: String
    authors: [String]
    description: String
    image: String
    link: String
    title: String
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
    saveBook(body: savedBooks!): User
    removeBook(bookId: ID!): User
  }
  input savedBooks {
    bookId: String!
    authors: [String]
    description: String
    image: String
    link: String
    title: String
  }
`;


module.exports = typeDefs;
