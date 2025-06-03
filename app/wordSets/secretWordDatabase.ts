import { SecretWord, SecretWordCategory, SecretWordEntry, SecretWordSet } from './secretWord'
import animalWordSet from './wordSet_Animal.json'
import foodWordSet from './wordSet_Food.json'
import personWordSet from './wordSet_Person.json'
import placeWordSet from './wordSet_Place.json'
import sportsWordSet from './wordSet_Sport.json'
import objectWordSet from './wordSet_Object.json'

const availableWordSets: SecretWordSet[] = [personWordSet, placeWordSet, objectWordSet, animalWordSet, foodWordSet, sportsWordSet]

const randomIndex: (size: number) => number = size => Math.floor(Math.random() * size)

// Fisher-Yates shuffle algorithm
function shuffle<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

function getRandomSecretWord(wordSetIds: number[]): SecretWord {
  if (!wordSetIds || wordSetIds.length === 0) {
    throw new Error('No word sets provided');
  }

  const sets: SecretWordSet[] = wordSetIds.map(value => availableWordSets[value])
    .filter(set => set !== undefined);

  if (sets.length === 0) {
    throw new Error('No valid word sets found');
  }

  const randomSet = sets[randomIndex(sets.length)]
  const randomEntryIndex = randomIndex(randomSet.setSize)
  const entry = randomSet.secretWords[randomEntryIndex] as SecretWordEntry

  if (!entry || !entry.hints || !entry.word) {
    throw new Error('Invalid word entry found');
  }

  const hints = shuffle(entry.hints)
    .slice(0, 20)
    .map(hint => hint
      .trim() // remove leading and trailing spaces
      .replace(/\.\s*$/, '') // remove trailing dot
      .replace(/^./, match => match.toUpperCase()) // uppercase first letter
    )
    
  const word = entry.word
    .trim() // remove leading and trailing spaces
    .replace(/-/g, '') // remove dashes
    .replace(/^./, match => match.toUpperCase()); // uppercase first letter
    
  console.log('Word: ' + word)
  return { 
    word: word,
    category: SecretWordCategory[randomSet.category], 
    hints: hints
  }
}

export default getRandomSecretWord;