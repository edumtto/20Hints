import baseHintCardsJson from './baseHintCards.json'
import { SecretWord } from './secret-word'

export function localBaseHintCards(): [SecretWord] {
  return baseHintCardsJson.hint_cards as [SecretWord]
}

export function getRandomHintCardIndex(): number {
  let hintCardsLength = baseHintCardsJson.hint_cards.length
  let randomIndex = Math.floor(Math.random() * hintCardsLength)
  return randomIndex
}

export function getSecretWord(index: number): SecretWord {
  return baseHintCardsJson.hint_cards[index] as SecretWord
}