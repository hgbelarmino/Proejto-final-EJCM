const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  return res.json({
    mensagem: "API Elektro funcionando!"
  });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});