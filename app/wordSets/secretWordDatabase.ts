import placeWordSet from './wordSet_Place.json'
import personWordSet from './wordSet_Person.json'
import thingWordSet from './wordSet_Thing.json'
import { SecretWord, SecretWordCategory, SecretWordEntry, SecretWordIndex, SecretWordSet } from './secretWord'

const wordSets: SecretWordSet[] = [placeWordSet, personWordSet, thingWordSet]

export function getRandomSecretWord(): SecretWord {
  const index = getRandomSecretWordIndex(wordSets)
  const secretWord = getSecretWord(index)
  console.log(secretWord)
  return secretWord
}

function getRandomSecretWordIndex(sets: SecretWordSet[]): SecretWordIndex {
  const categoryIndex = Math.floor(Math.random() * 3)
  const randomWordSet = wordSets[categoryIndex]
  const wordIndex = Math.floor(Math.random() * randomWordSet.setSize)
  return {category: categoryIndex, word: wordIndex}
}

function getSecretWord(index: SecretWordIndex): SecretWord {
  const set = wordSets[index.category]
  const category = SecretWordCategory[set.category]
  const entry = set.secretWords[index.word] as SecretWordEntry
  return {word: entry.word, category: category, hints: entry.hints}
}