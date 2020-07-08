import { getDecks, saveNewDeck, removeDeck } from '../utils/api'


export const ADD_DECK = 'ADD_DECK'
export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_CARD = 'ADD_CARD'
export const REMOVE_DECK = 'REMOVE_DECK'

export function addDeck (deck){
    return {
        type: ADD_DECK,
        deck,
    }
}

export function addCard (card, title){
    return {
        type: ADD_CARD,
        card,
        title,
    }
}

export function receiveDecks (decks){
    return{
        type: RECEIVE_DECKS,
        decks,
    }
}

export function removeDeckAction(id) {
    return async (dispatch) => {
        await removeDeck(id);
        dispatch({
            type: REMOVE_DECK,
            id,
        })
    }
}

export function handleAddDeck(deck){
    return (dispatch) =>{
        dispatch(addDeck(deck))
        return saveNewDeck(deck.title)

    }
}

export function handleInitialData(){
    return (dispatch) =>{
        return getDecks ()
            .then((decks) =>{
                dispatch(receiveDecks({decks}))
            })
    }
}

