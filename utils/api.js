import { AsyncStorage } from 'react-native'

export const DECK_STORAGE = 'Flashcards:decks'

const decks = {
    React: {
        id: 'loxhs1bqm25b708cmbf3g',
        title: 'Food',
        questions: [
        {
            id: '8xf0y6ziyjabvozdd253nd',
            question: 'What does the secret of KFC Chicken tasted so good?',
            answer: '11 Secret Herb and Spices',
            correctAns: 'true'
        },
        {
            id: '6ni6ok3ym7mf1p33lnez',
            question: 'What is the most favourite McDonalds Burger in Singapore?',
            answer:  'Double McSpicy',
            correctAns: 'true'
        }
        ]
    },
    BubbleTea: {
        id: 'vthrdm985a262al8qx3do',
        title: 'BubbleTea',
        questions: [
        {
            id: 'am8ehyc8byjqgar0jgpub9',
            question: 'Which year does LIHO shop open?',
            answer: 'Established in 2017 by Royal T Group',
            correctAns: 'true'
        }
        ]
    }


}

function generateId() {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
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
                id: generateId(),
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

//Error said this function didnt have 'return'
export async function removeDeck(id) {
    const decks = await AsyncStorage.getItem(DECKS_STORAGE);
  
    const filteredDecks = JSON.parse(decks).filter((deck) => deck.id !== id);
  
    AsyncStorage.setItem(DECKS_STORAGE, JSON.stringify(filteredDecks));

    return;
  }