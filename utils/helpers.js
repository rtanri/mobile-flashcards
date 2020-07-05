import React from 'react'
import {View, StyleSheet, AsyncStorage} from 'react-native'
import { red, orange, blue, lightPurp, pink, white } from './colors'
import { FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'

const styles = StyleSheet.create({
    iconContainer: {
      padding: 5,
      borderRadius: 8,
      width: 50,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 20
    },
})

export function getDecks(){
    const decks ={
        Food: {
            title: 'Food',
            questions: [
              {
                question: 'What does the secret of KFC Chicken tasted so good?',
                answer: '11 Secret Herb and Spices'
              },
              {
                question: 'What is the most favourite McDonalds Burger in Singapore?',
                answer: 'Double McSpicy'
              }
            ]
          },
        Bubbletea: {
            title: 'BubbleTea',
            questions: [
              {
                question: 'Which year does LIHO shop opened?',
                answer: 'Established in 2017 by Royal T Group'
              }
            ]
        }
    }
    return decks
}

export const DECK_STORAGE_KEY = 'FlashCards:Deck'

export async function fetchDeckResults() {
    let result = await AsyncStorage.getItem(DECK_STORAGE_KEY)
    return result;
} 


export const GET_ALL_DECKS = 'GET_ALL_DECKS'
export const GET_DECK = 'GET_DECK'
export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD_TO_DECK = 'ADD_CARD_TO_DECK'
export const DELETE_DECK = 'DELETE_DECK'