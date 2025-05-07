const express = require("express");
const app = express();
const port = 3000;
const userRoutes = require("./routes/users");
const cardRoutes = require("./routes/cards");
const mongoose = require("mongoose");

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
  res.status(500).json({ message: "A solicitação não foi encontrada" });
});

app.use((req, res, next) => {
  req.user = {
    _id: "67c22b2f9eae73490089487f", // cole o _id do usuário teste criado no passo anterior
  };

  next();
});

app.use(userRoutes);
app.use(cardRoutes);
app.use("/", (req, res) => {
  res.status(404).send({ message: "A solicitação não foi encontrada" });
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
