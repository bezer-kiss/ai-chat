import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const client = new OpenAI({

  apiKey:
    process.env.OPENROUTER_API_KEY,

  baseURL:
    "https://openrouter.ai/api/v1"

});

app.post("/chat", async (req, res) => {

  try {

    const userMessage =
      req.body.message;

    const completion =
      await client.chat.completions.create({

        model:
          "mistralai/mistral-7b-instruct:free",

        messages: [

          {
            role:"system",

            content:
            `
            Ты AI помощник
            для организаторов мероприятий.

            Помогай:
            - с идеями
            - с концепциями
            - со сценариями
            - с оформлением
            - с таймингом
            `
          },

          {
            role:"user",
            content:userMessage
          }

        ]

      });

    res.json({

      reply:
        completion
        .choices[0]
        .message
        .content

    });

  } catch(e){

    console.log(e);

    res.status(500).json({

      error:"Ошибка AI"

    });

  }

});

app.listen(3000, () => {

  console.log("СЕРВЕР ЗАПУЩЕН");

});