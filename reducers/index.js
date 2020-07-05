  
import { GET_ALL_DECKS, ADD_DECK, GET_DECK, ADD_CARD } from '../utils/helpers'

function deckReducer(state = {}, action) {
  switch (action.type) {
    case GET_ALL_DECKS:
      return {
        ...state,
        ...action.decks
      }
    case ADD_DECK:
      return {
        ...state,
        [action.deck.id]: action.deck
      }
    default:
        return state
  }
}

export default decksReducer