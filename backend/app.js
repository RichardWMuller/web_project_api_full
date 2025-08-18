const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
require("dotenv").config();

const userRoutes = require("./routes/users");
const cardRoutes = require("./routes/cards");
const { requestLogger, errorLogger } = require("./middleware/logger");

app.use(express.json());

app.use(requestLogger);

const CONNECTION_URI =
  process.env.CONNECTION || "mongodb://localhost:27017/aroundb";

mongoose
  .connect(CONNECTION_URI)
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

app.use(errorLogger);

app.use((req, res) => {
  res.status(404).send({ message: "A solicitação não foi encontrada" });
});

app.use((err, req, res, next) => {
  res.status(500).send({ message: "Erro interno do servidor" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
