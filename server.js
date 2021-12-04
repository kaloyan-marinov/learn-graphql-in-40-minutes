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
/*
    Q: Why is the value under the `fields` key a function (instead of just an object)?
    A: B/c each of `AuthorType` and `BookType` references the other one!
*/
const AuthorType = new GraphQLObjectType({
  name: "Author",
  description: "this represents an author",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) }, // Don't need to supply a `resolve`, b/c the object's `id` property will be directly pulled out
    name: { type: new GraphQLNonNull(GraphQLString) }, // Same as above.
    books: {
      type: new GraphQLList(BookType),
      resolve: (parent) => {
        // In this case, the `parent` is of `AuthorType`.
        return books.filter((book) => book.authorId === parent.id);
      },
    },
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
    author: {
      type: AuthorType,
      description: "a single author",
      args: {
        id: { type: GraphQLInt },
      },
      resolve: (parent, args) => {
        // TOOD: check if the next comment is true
        // In this case, the `parent` is of `RootQueryType`.
        return authors.find((author) => author.id === args.id);
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      description: "list of all authors",
      resolve: () => authors,
    },
    book: {
      type: BookType,
      description: "a single book",
      args: {
        id: { type: GraphQLInt },
      },
      resolve: (parent, args) => {
        return books.find((book) => book.id === args.id);
      },
    },
    books: {
      type: new GraphQLList(BookType),
      description: "list of all books",
      resolve: () => books, // In general, the input can be `(parent, args) => { ... }`
    },
  }),
});

// - the "mutation" section is
//   "GraphQL's version of using POST, PUT, and DELETE on a REST API server"
const RootMutationType = new GraphQLObjectType({
  name: "RootMutation",
  description: "this represents the so-called 'root mutation'",
  fields: () => ({
    addAuthor: {
      type: AuthorType,
      description: "add an author",
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (parent, args) => {
        // TOOD: check if the next comment is true
        // In this case, the `parent` is of `RootMutationType`.
        const author = {
          id: authors.length + 1,
          name: args.name,
        };
        authors.push(author);
        return author;
      },
    },
    addBook: {
      type: BookType,
      description: "add a book",
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve: (parent, args) => {
        const book = {
          id: books.length + 1,
          name: args.name,
          authorId: args.authorId,
        };
        books.push(book);
        return book;
      },
    },
  }),
});

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
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
