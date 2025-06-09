const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const userRoutes = require("./routes/users");
const cardRoutes = require("./routes/cards");
const mongoose = require("mongoose");
require("dotenv").config();

app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/aroundb")
  .then(() => {
    console.log(`MongoDB connected...`);
  })
  .catch((err) => {
    console.error("Erro de conexão com MongoDB:", err);
  });

app.get("/", (req, res) => {
  res.send({ message: "API rodando com sucesso" });
});

app.use("/users", userRoutes);
app.use("/cards", cardRoutes);

app.use("/", (req, res) => {
  res.status(404).send({ message: "A solicitação não foi encontrada" });
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
