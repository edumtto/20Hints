import React, { useState } from 'react';
import { ActivityIndicator, Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Card, generateHintCard } from '../card-generator-service'
import { ScrollView, TextInput } from 'react-native-gesture-handler';


const CreateScreen: React.FC = () => {
  const [isFetchingCard, setIsFetchingCard] = useState(false);
  let hintCard: Card|null = { 
    word: 'Lighthouse',
    hints:[
      'A beacon of hope in the dark.',
      'A tall structure with a bright light at the top.',
      'It warns ships of danger.',
      'Often found on rocky shores.',
      'It helps guide vessels through stormy seas.',
      'Its light can be seen for miles.',
      'It stands tall and proud against the wind and waves.',
      'A symbol of safety and guidance.',
      'It has a rotating light that flashes in a specific pattern.',
      'It\'s often painted white with red stripes.',
      'It can be powered by electricity, gas, or even solar energy.',
      'It has a strong foundation to withstand harsh weather.',
      'It can be manned or automated.',
      'It\'s often accompanied by a foghorn.',
      'It\'s a landmark for sailors and tourists alike.',
      'It has a history of saving lives at sea.',
      'It\'s a source of inspiration for artists and writers.',
      'It\'s a reminder of the power and mystery of the ocean.',
      'It\'s a symbol of strength and resilience.',
      'It can be found around the world, from the coast of Maine to the cliffs of Ireland.'
    ]
  }

  // const card = generateHintCard()
  // .then(res => {
  //   hintCard = res
  //   setIsFetchingCard(false)

  // })
  // .catch(err => console.log(err))

  const Hint = (number: number, hint: string) => {
    const [isHidden, setIsHidden] = useState(true);
    return <TouchableOpacity key={number} style={styles.hintContainer} onPress={() => setIsHidden(!isHidden)}>
      <Text style={styles.hintNumber}>{number}</Text>
      <Text style={styles.hintText}>{isHidden ? '': hint}</Text> 
    </TouchableOpacity>
  }

  const content = () => {
    if (isFetchingCard) {
      return <ActivityIndicator style={{ padding: 32 }} size="large" />
    }
    if (hintCard !== null) {
      let counter = 1

      return <ScrollView>
        <View style={styles.container}>
          <View style={styles.wordContainer}>
            {/* <Text style={styles.word}>{hintCard.word}</Text> */}
            <Text>The word is </Text>
            <TextInput placeholder='???' style={{ backgroundColor: 'white', padding: 8, borderWidth: 1, borderColor: '#ccc'}}/>
          </View>
          { hintCard.hints.map( (hint) => Hint(counter++, hint) )}
        </View>
      </ScrollView>
    }
    return <Text>Error</Text>
  }
  
  return content()
}

const styles = StyleSheet.create({
  container: {
      width: "100%",
      maxWidth: 800,
      marginHorizontal: 'auto',
      backgroundColor: '#fff',
      padding: 12,
      margin: 16,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 8
  },
  wordContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 'auto',
  },
  word: {
    // flexDirection: 'row',
    // justifyContent: 'space-around',
    textAlign: 'center',
    padding: 24,
    fontSize: 24
  },
  hintContainer: {
    flex: 1,
    flexDirection: 'row',
    padding:4,
  },
  hintNumber: {
    height: 40,
    width: 40,
    backgroundColor: '#fff',
    borderRadius: 20,
    borderColor: '#aaa',
    borderWidth: 1,
    textAlign: 'center',
    alignContent: 'center'
  },
  hintText: {
    alignContent: 'center',
    paddingLeft: 8,
    // backgroundColor: 'gray'
  }
});

export default CreateScreen


// ## Word: Lighthouse

// **Hints:**

// 1. A beacon of hope in the dark.
// 2. A tall structure with a bright light at the top.
// 3. It warns ships of danger.
// 4. Often found on rocky shores.
// 5. It helps guide vessels through stormy seas.
// 6. Its light can be seen for miles.
// 7. It stands tall and proud against the wind and waves.
// 8. A symbol of safety and guidance.
// 9. It has a rotating light that flashes in a specific pattern.
// 10. It's often painted white with red stripes.
// 11. It can be powered by electricity, gas, or even solar energy.
// 12. It has a strong foundation to withstand harsh weather.
// 13. It can be manned or automated.
// 14. It's often accompanied by a foghorn.
// 15. It's a landmark for sailors and tourists alike.
// 16. It has a history of saving lives at sea.
// 17. It's a source of inspiration for artists and writers.
// 18. It's a reminder of the power and mystery of the ocean.
// 19. It's a symbol of strength and resilience.
// 20. It can be found around the world, from the coast of Maine to the cliffs of Ireland. 

/*
{
  "word": "castle",
  "hints": [
    "A fortified structure, often with towers and walls.",
    "Historically, a residence for royalty or nobility.",
    "May be located on a hilltop for defensive purposes.",
    "Often associated with knights, dragons, and fairytales.",
    "A symbol of power and prestige.",
    "Can be found in many countries around the world.",
    "Some are preserved as historical landmarks.",
    "May have a moat surrounding it for added protection.",
    "Often features a drawbridge for entry.",
    "May have a dungeon for prisoners.",
    "Can be made of stone, brick, or wood.",
    "Some are still inhabited today.",
    "A popular subject in art and literature.",
    "May have a chapel or church within its walls.",
    "Can be a popular tourist attraction.",
    "Often associated with medieval times.",
    "May have been used for military purposes.",
    "Some are ruins from ancient times.",
    "A place of mystery and intrigue.",
    "A symbol of strength and resilience."
  ]
}
*/