import express from "express";
import { graphqlHTTP } from "express-graphql";
import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
} from "graphql";

import { authors, books } from "./mockDatabase.js";

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 5000;

const app = express();

// Define/Create a GraphQL schema.

// - the "query" section is "the getting of data"
const AuthorType = new GraphQLObjectType({
  name: "Author",
  description: "this represents an author",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) }, // Don't need to supply a `resolve`, b/c the object's `id` property will be directly pulled out
    name: { type: new GraphQLNonNull(GraphQLString) }, // Same as above.
  }),
});

const BookType = new GraphQLObjectType({
  name: "Book",
  description: "this represents a book written by an author",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    authorId: { type: new GraphQLNonNull(GraphQLInt) },
    author: {
      type: AuthorType,
      resolve: (parent) => {
        // In this case, the `parent` is of `BookType`.
        return authors.find((author) => author.id === parent.authorId);
      },
    },
  }),
});

const RootQueryType = new GraphQLObjectType({
  name: "RootQuery",
  description: "this represents the so-called 'root query'",
  fields: () => ({
    books: {
      type: new GraphQLList(BookType),
      description: "list of all books",
      resolve: () => books, // In general, the input can be `(parent, args) => { ... }`
    },
  }),
});

const schema = new GraphQLSchema({
  query: RootQueryType,
});

// Add GraphQL to the backend application.
app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true, // Gives a GUI to the GraphQL server.
    schema,
  })
);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
