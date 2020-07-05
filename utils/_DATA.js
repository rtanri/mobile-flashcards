let decks = {
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
          question: 'Which year does LIHO open?',
          answer: 'Established in 2017 by Royal T Group'
        }
      ]
    }
  }
  
  
  export function _getDecks() {
    return new Promise((res, rej) => {
      setTimeout(() => res({ ...decks }), 1000);
    });
  } 