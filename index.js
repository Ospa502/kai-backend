import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Configuración de OpenAI
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

// Endpoint principal
app.post('/mensaje', async (req, res) => {
  const { message, sender_id } = req.body;

  if (!message || !sender_id) {
    return res.status(400).json({ error: 'Falta message o sender_id' });
  }

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'Sos Kai, el asistente de Kanguro GT. Respondé con amabilidad y claridad sobre sillas, productos y soporte.'
        },
        {
          role: 'user',
          content: message
        }
      ]
    });

    const respuesta = completion.data.choices[0].message.content;

    res.json({ respuesta });

  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: 'Error al generar respuesta desde OpenAI' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Kai backend corriendo en puerto ${PORT}`));
