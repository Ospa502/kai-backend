const express = require("express");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post("/mensaje", (req, res) => {
  const { message, sender_id } = req.body;
  console.log(`Mensaje recibido de ${sender_id}: ${message}`);
  res.json({ respuesta: `Hola, soy Kai. Usted escribió: '${message}'` });
});

app.listen(PORT, () => {
  console.log(`Servidor activo en puerto ${PORT}`);
});
