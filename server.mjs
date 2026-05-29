import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

const client = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY,
});

app.post("/chat", async (req, res) => {

    try {

        const userMessage = req.body.message;

        const completion =
            await client.chat.completions.create({

                model: "deepseek/deepseek-chat-v3-0324",

                messages: [
                    {
                        role: "user",
                        content: userMessage
                    }
                ]

            });

        const reply =
            completion.choices[0].message.content;

        res.json({
            reply: reply
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            reply: "Ошибка сервера"
        });

    }

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log("СЕРВЕР ЗАПУЩЕН");

});