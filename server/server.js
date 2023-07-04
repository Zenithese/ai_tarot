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
    let { arrangement, theme, question } = req.body;

    if (theme === 'The cross formation') theme += ' (the card order is as follows, 1 on the left representing the past, 2 in the center representing the present, 3 on the right representing future, 4 up top representing the core reason for circumstances and 5 below representing the potential of situation. The reading should go left to center to right to top to bottom.)';

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { "role": "system", "content": `Give a tarot reading.` },
        { "role": "user", "content": `Using this array of tarot cards ${arrangement} and the following theme: ${theme}, interpret them considering this intention: ${question.length ? question : 'give me a general reading'}. When useful and dramatic to use the imagery of the cards from The Rider Tarot Deck into your reading. Do not mention "The Rider Tarot Deck" at all in your response. Finally lean into a wiccan terminology.` }
      ]
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