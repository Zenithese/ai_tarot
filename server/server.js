import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import { Configuration, OpenAIApi } from 'openai'

dotenv.config()

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'Hello inquirer!'
  })
})

app.post('/', async (req, res) => {
  try {
    const messages = req.body.messages;

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: messages
    });

    res.status(200).send({
      reading: response.data.choices[0].message.content
    });

  } catch (error) {
    console.error(error)
    res.status(500).send(error || 'Something went wrong');
  }
})

app.listen(3001, () => console.log('AI server started on http://localhost:3001'))