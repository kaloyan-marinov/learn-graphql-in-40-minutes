import express from "express";

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 5000;

const app = express();

app.get("/", (req, res) => {
  res.json({
    message: "Hello world!",
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
