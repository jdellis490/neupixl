const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    imageCards: [ImageCard]
  }

  type ImageCard {
    _id: ID
    imageUrl: String
    title: String
    description: String
    imageAuthor: String
    createdAt: String
    comments: [Comment]!
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    imageCards(username: String): [ImageCard]
    imageCard(imageId: ID!): ImageCard
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addImageCard(
      imageUrl: String!
      title: String!
      description: String!
      imageAuthor: String!
    ): ImageCard
    addComment(
      imageId: ID!
      commentText: String!
      commentAuthor: String!
    ): ImageCard
    deleteImageCard(imageId: ID!): ImageCard
    deleteComment(imageId: ID!, commentId: ID!): ImageCard
  }
`;

module.exports = typeDefs;
