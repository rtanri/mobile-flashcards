let decks = {
    Food: {
      id: 'lyvhs1bqm25b708cmbf3g',
      title: 'Food',
      questions: [
        {
          id: 'k3mrdm985a262al8qx3do',
          question: 'What does the secret of KFC Chicken tasted so good?',
          answer: '11 Secret Herb and Spices'
        },
        {
          id:'u7tehyc8byjqgar0pfpub9',
          question: 'What is the most favourite McDonalds Burger in Singapore?',
          answer: 'Double McSpicy'
        }
      ]
    },
    Bubbletea: {
      id: '8xf0y6j8zjabvozdd253nd',
      title: 'BubbleTea',
      questions: [
        {
        id: 'muf0y6ziysabv3tdd253nd',
          question: 'Which year does LIHO open?',
          answer: 'Established in 2017 by Royal T Group'
        }
      ]
    }
  }

//1. To Generate Random key-ID
function generateDeckId() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}
 

//2. To get all decks
export function _getAllDecks() {
    return new Promise((res, rej) => {
      setTimeout(() => res(decks), 1000);
    });
}


//3. To set the Deck Template and Save new deck
function formatDeck({ title }) {
    return {
      id: generateDeckId(),
      title,
      questions: [],
    }
}

export function _saveDeck(deck) {
    return new Promise((res, rej) => {
      const formattedDeck = formatDeck(deck);
      setTimeout(() => {
        decks.push(formattedDeck);
        res(formattedDeck);
      }, 1000);
    });
  }
  

//4. To set the template of question and save new question
function formatQuestion(question, answer) {
    return {
      id: generateDeckId(),
      question,
      answer
    }
}

export function _saveQuestion({ deckid, question, answer }){
    return new Promise((res,rej) => {
        const formattedQuestion = formatQuestion(question, answer);
        setTimeout(() => {
            decks[deckid].questions.push(formattedQuestion)
            res(decks);
        }, 500);
    });
}