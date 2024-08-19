import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { content } = req.body;

  try {
    const response = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: `Create 5 flashcards from the following content:\n\n${content}\n\nFormat each flashcard as JSON: {"question": "...", "answer": "..."}`,
      max_tokens: 1000,
      n: 1,
      stop: null,
      temperature: 0.7,
    });

    const flashcardsText = response.data.choices[0].text.trim();
    const flashcards = flashcardsText.split('\n').map((card, index) => {
      const parsedCard = JSON.parse(card);
      return { id: index + 1, ...parsedCard };
    });

    res.status(200).json(flashcards);
  } catch (error) {
    console.error('Error generating flashcards:', error);
    res.status(500).json({ error: 'Error generating flashcards' });
  }
}