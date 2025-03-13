export {};

declare global {
  interface Array<T> {
    /**
     * Returns an array with suffled elements. Uses Fisher–Yates shuffle algorithm.
     */
    shuffle(): T[];
  }
}

Array.prototype.shuffle = function<T>(): T[] {
  const newArray = [...this]; // Create a copy to avoid mutation
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]]; // Swap elements
  }
  return newArray;
}

let a = [1, 2, 3, 4, 5];
let b = a.shuffle();