import express from "express";
import { graphqlHTTP } from "express-graphql";

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 5000;

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true, // Gives a GUI to the GraphQL server.
  })
);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
