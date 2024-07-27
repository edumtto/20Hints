
export enum SecretWordCategory {
  Person, Place, Thing
}

export interface SecretWord {
  category: SecretWordCategory;
  word: string;
  hints: string[];
}
