import { ADD_DECK, RECEIVE_DECKS, ADD_CARD, REMOVE_DECK } from '../actions'

function decks (state={}, action){
    switch (action.type){
        case ADD_DECK :
            const { deck } = action
            return {
                ...state,
                decks:{
                    ...state.decks,
                    [deck.title]: deck
                }
            }
        case RECEIVE_DECKS:
            return {
                ...state,
                ...action.decks
            }
        case ADD_CARD:
            const { card, title } = action
            return{
                ...state,
                decks:{
                    ...state.decks,
                    [title]:{
                        title: title,
                        questions: state.decks[title].questions.concat([card])
                    }
                }
            }
        case REMOVE_DECK:
            // Create new clone object decks
            const newDecks = { ...state.decks }
            // Delete key in newDecks based on action 'id' passed from the Component
            delete newDecks[action.id]

            return {
                ...state, //at this point, new object has been created with the same state-data from default state called
                decks: newDecks // adjust the 'decks' data into the 'newDecks'
            }
        default:
            return state
    }
}

export default decks 