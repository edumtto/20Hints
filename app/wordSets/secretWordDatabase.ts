import { SecretWord, SecretWordCategory, SecretWordEntry, SecretWordSet } from './secretWord'
import animalWordSet from './wordSet_Animal.json'
import foodWordSet from './wordSet_Food.json'
import personWordSet from './wordSet_Person.json'
import placeWordSet from './wordSet_Place.json'
import sportsWordSet from './wordSet_Sport.json'
import objectWordSet from './wordSet_Object.json'

const availableWordSets: SecretWordSet[] = [personWordSet, placeWordSet, objectWordSet, animalWordSet, foodWordSet, sportsWordSet]

const randomIndex: (size: number) => number = size => Math.floor(Math.random() * size)

function getRandomSecretWord(wordSetIds: number[]): SecretWord {
  const sets: SecretWordSet[] = wordSetIds.map( value => availableWordSets[value])
  const randomSet = sets[randomIndex(sets.length)]
  const randomEntryIndex = randomIndex(randomSet.setSize)
  const entry = randomSet.secretWords[randomEntryIndex] as SecretWordEntry
  return { 
    word: entry.word,
    category: SecretWordCategory[randomSet.category], 
    hints: entry.hints.shuffle().slice(0, 20)
  }
}

export default getRandomSecretWord;