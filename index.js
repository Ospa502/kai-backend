const express = require("express");
const app = express();
app.use(express.json());

app.post("/mensaje", (req, res) => {
  const { message, sender_id } = req.body;
  console.log("Mensaje recibido:", message, "de:", sender_id);

  res.json({
    respuesta: `Hola, soy Kai. Recibí tu mensaje: "${message}"`,
    sender_id: sender_id
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
