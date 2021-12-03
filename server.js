import express from "express";
import { graphqlHTTP } from "express-graphql";
import { GraphQLSchema, GraphQLObjectType, GraphQLString } from "graphql";

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 5000;

const app = express();

// Define/Create a dummy GraphQL schema.

// - the "query" section is "the getting of data"
const query = new GraphQLObjectType({
  name: "HelloWorld",
  fields: () => ({
    message: {
      type: GraphQLString,
      resolve: () => "Hello world!", // In general, the input can be `(parent, args) => { ... }`
    },
  }),
});

const schema = new GraphQLSchema({
  query,
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
