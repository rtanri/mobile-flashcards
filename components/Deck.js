import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { purple, white, green, lightPurp, orange,  gray } from '../utils/colors'


const Deck = (props) =>{
    const { title, count } = props

    return (
        <View style={styles.deckContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text>{count} cards</Text>
        </View>
      )
    }

const styles = StyleSheet.create({
  deckContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
    padding: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: gray,
    backgroundColor: lightPurp,
    shadowColor: "rgba(0,0,0,0.34)",
    shadowOffset:{
        width: 0,
        height: 3,
    },
    shadowRadius: 4,
    shadowOpacity: 1


  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: purple
  }
})

export default Deck 