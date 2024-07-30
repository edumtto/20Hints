import { SecretWord } from './secret-word'

const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI("AIzaSyAsr_AjndnXFAFv9Hivy325-mUUEHWRuP4"); //process.env.API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

// I'm building a game where the player need to guess a word given a few hints. Write 21 very short hints for the specific place/location "Hollywood Sign" for this game. Make sure to make it challenging, not giving very easy clues/hints. Format your response as a JSON file, following this example:
const prompt: string = `
  Select a random word that represents an object, a person or a place. 
  Generate a list of 20 short hints to that word.
  Return it in the JSON format below:
  {
    'word': 'selected random word',
    'hints': [
      'first hint',
      'second hint',
      'third hint'
    ]
  }
`

export async function generateHintCard(): Promise<SecretWord> {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    console.log(text);
    
    let parsedData;
    try {
      parsedData = JSON.parse(text);
    } catch {
      console.log("ERROR TRYING TO PARSE DATA");
    }

    if (!parsedData) {
      parsedData = parseJSONFromString(text);
    }

    console.log(parsedData);

  return parsedData as SecretWord
}

function parseJSONFromString(stringWithJSON: string) {
  // Find the start and end positions of the JSON string
  const startIndex = stringWithJSON.indexOf("```json") + 7; // length of '```json'
  const endIndex = stringWithJSON.lastIndexOf("```");

  if (startIndex === -1 || endIndex === -1 || endIndex <= startIndex) {
    throw new Error("Invalid JSON string format");
  }

  // Extract the JSON string
  const jsonString = stringWithJSON.substring(startIndex, endIndex);

  // Parse the JSON string
  return JSON.parse(jsonString);
}