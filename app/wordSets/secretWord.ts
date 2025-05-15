
export enum SecretWordCategory {
  Person = "Person", 
  Place = "Place", 
  Object = "Object",
  Animal = "Animal",
  Food = "Food",
  Sport = "Sport"
}

export interface SecretWord {
  word: string;
  category: SecretWordCategory;
  hints: string[];
}

export interface SecretWordEntry {
  word: string;
  hints: string[];
}

export interface SecretWordIndex {
  category: number;
  word: number;
}

export interface SecretWordSet {
  category: string;
  setSize: number;
  secretWords: SecretWordEntry[];
}
