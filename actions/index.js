import {GET_ALL_DECKS, ADD_DECK, GET_DECK, ADD_CARD} from '../utils/helpers'

export function getAllDecks(){
    return{
        type: GET_ALL_DECKS,
        decks,
    }
}

export function addDeck(deck){
    return{
        type: ADD_DECK,
        deck,
    }
}

