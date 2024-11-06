import placeWordSet from './wordSet_Place.json'
import personWordSet from './wordSet_Person.json'
import thingWordSet from './wordSet_Thing.json'
import animalWordSet from './wordSet_Animal.json'
import foodWordSet from './wordSet_Food.json'
import sportsWordSet from './wordSet_Sport.json'
import { SecretWord, SecretWordCategory, SecretWordEntry, SecretWordIndex, SecretWordSet } from './secretWord'

const availableWordSets: SecretWordSet[] = [placeWordSet, thingWordSet, personWordSet, animalWordSet, foodWordSet, sportsWordSet]

const randomIndex: (size: number) => number = size => Math.floor(Math.random() * size)

export function getRandomSecretWord(wordSetIds: number[]): SecretWord {
  const sets: SecretWordSet[] = wordSetIds.map( value => availableWordSets[value])
  // console.log('geting random word in ' + sets.length + ' sets')
  const randomSet = sets[randomIndex(sets.length)]
  const randomEntryIndex = randomIndex(randomSet.setSize)
  const entry = randomSet.secretWords[randomEntryIndex] as SecretWordEntry
  return { 
    word: entry.word, 
    category: SecretWordCategory[randomSet.category], 
    hints: entry.hints
  }
}