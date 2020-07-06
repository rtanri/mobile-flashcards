import { AsyncStorage } from 'react-native'

export const DECK_STORAGE = 'Flashcards:decks'

const decks = {
    React: {
        title: 'Food',
        questions: [
        {
            question: 'What does the secret of KFC Chicken tasted so good?',
            answer: '11 Secret Herb and Spices',
            correctAns: 'true'
        },
        {
            question: 'What is the most favourite McDonalds Burger in Singapore?',
            answer:  'Double McSpicy',
            correctAns: 'true'
        }
        ]
    },
    BubbleTea: {
        title: 'BubbleTea',
        questions: [
        {
            question: 'Which year does LIHO shop open?',
            answer: 'Established in 2017 by Royal T Group',
            correctAns: 'true'
        }
        ]
    }


}
export const getData = () =>{
    return decks;
}

export function getDecks (){
    AsyncStorage.removeItem(DECK_STORAGE)
    return AsyncStorage.getItem(DECK_STORAGE)
        .then(results =>{
            if (results === null){
                AsyncStorage.setItem(DECK_STORAGE, JSON.stringify(decks))
                return decks
            }else{
                return JSON.parse(results)
            }
        })
}

export function saveNewDeck (title) {
    return getDecks()
        .then((decks) => {
            return {
            ...decks,
            [title]: {
                title,
                questions: [],
            }
            }
        })
        .then((newDecks) => {
            AsyncStorage.setItem(DECK_STORAGE, JSON.stringify(newDecks))
        })
}

export function addCardToDeck(card, title){
      getDecks()
        .then((decks) =>{
            return{
                ...decks,
                [title]:{
                    questions: decks[title].questions.concat([card])
                }
            }
        })
        .then((newDecks) =>{
            AsyncStorage.setItem(DECK_STORAGE, JSON.stringify(newDecks))
        })
} 