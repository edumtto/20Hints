import baseHintCardsJson from './baseHintCards.json'
import HintCard from './HintCard'

export function localBaseHintCards(): [HintCard] {
  return baseHintCardsJson.hint_cards as [HintCard]
}

export function getRandomHintCardIndex(): number {
  let hintCards = localBaseHintCards()
  let randomIndex = Math.floor(Math.random() * hintCards.length)
  return randomIndex
}

export function getHintCard(index: number): HintCard {
  return baseHintCardsJson.hint_cards[index] as HintCard
}