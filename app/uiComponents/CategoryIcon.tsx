import React from 'react';
import { FontAwesome6 } from '@expo/vector-icons';
import { SecretWordCategory } from '../wordSets/secretWord';

const CategoryIcon: React.FC = (category: SecretWordCategory) => {
  switch (category) {
    case SecretWordCategory.Person:
      return <FontAwesome6 name='face-grin-wide' size={18} color='black' />
    case SecretWordCategory.Place:
      return <FontAwesome6 name='location-dot' size={18} color='black' />
    case SecretWordCategory.Thing:
      return <FontAwesome6 name='cube' size={18} color='black' />
  }
}