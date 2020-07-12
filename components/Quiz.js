import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated
} from 'react-native';
import { connect } from 'react-redux';

import { blue, purple, darkorange, orange, green, gray, white, red } from '../utils/colors';
import { clearLocalNotification, setLocalNotification } from '../utils/helper';



class Quiz extends Component {

  //Create the animation value before the component is created
  UNSAFE_componentWillMount() {
    this.animatedValue = new Animated.Value(0)
    this.value = 0
    this.animatedValue.addListener(({ value }) => { this.value = value})

    this.frontInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg'],
    })

    this.backInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg']
    })

    this.frontOpacity = this.animatedValue.interpolate({
      inputRange: [89, 90],
      outputRange: [1, 0]
    })
    
    this.backOpacity = this.animatedValue.interpolate({
      inputRange: [89, 90],
      outputRange: [0, 1]
    })
  };


  state ={
    isLastCard: false,
    cardIdx: 0,
    flipSide: 'Back',
    score: 0,
    bounceScore : new Animated.Value(1)
  };

  flipCard(front=false) {
    if (this.value >= 90 || front) {
      Animated.spring(this.animatedValue,{
        toValue: 0,
        friction: 8,
        tension: 10,
        useNativeDriver: true, //Add this to keep the setting userNativeDriver to "true", and avoid warning
      }).start();
      this.setState({
        flipSide: 'Back'
      });
    } else {
      Animated.spring(this.animatedValue,{
        toValue: 180,
        friction: 8,
        tension: 10,
        useNativeDriver: true,//Add this to keep the setting userNativeDriver to "true", and avoid warning
      }).start();
      this.setState({
        flipSide: 'Front'
      })
    }
  };

  handleSelectClick = (selectedAns) =>{
    const { cardIdx, bounceScore} = this.state;
    const { questions } = this.props.deck;
    const isCorrect = selectedAns === 'true';

    if ( cardIdx + 1 === questions.length){
      this.setState((recentState) =>({
        isLastCard: true,
        score:  isCorrect ? recentState.score + 1: recentState.score
      }));
      Animated.sequence([
        Animated.timing(bounceScore, {
          duration:200,
          toValue:2.04,
          useNativeDriver: true, //Add this to keep the setting userNativeDriver to "true", and avoid warning
        }),
        Animated.spring(bounceScore, {
          toValue:1,
          friction:4,
          useNativeDriver: true, //Add this to keep the setting userNativeDriver to "true", and avoid warning
        })
      ]).start();

      // Clear local notification at the end of a completed quiz
      clearLocalNotification()
        .then(setLocalNotification);
    } else {
      this.setState((recentState) =>({
        cardIdx : recentState.cardIdx + 1,
        flipSide: 'Front',
        score:  isCorrect ? recentState.score + 1: recentState.score
      }));
      this.flipCard(true);
    }
  };

  handleRestart = () =>{
    this.setState({
      isLastCard: false,
      cardIdx: 0,
      flipSide: 'Back',
      score: 0,
    });
  };

  setTitle = (deckTitle) =>{
    this.props.navigation.setOptions({
        title: deckTitle + ' Quiz'
    });
    };

  render() {
    const { isLastCard, cardIdx, score, flipSide, bounceScore } = this.state;
    const { deck, navigation } = this.props;
    const { questions } = deck;

    //Flipcard animation
    const frontAnimatedStyle = {
      transform: [
        { rotateX: this.frontInterpolate }
      ]
    }
    const backAnimatedStyle = {
      transform: [
        { rotateX: this.backInterpolate }
      ]
    }
    this.setTitle(deck.title);

    return (
      <View style={styles.Scorecontainer}>
        {!isLastCard
        ?(
          <View style={{marginTop:-70}}>

              {/* current number of question */}
              <View style={styles.numberOfPage}>
                <Text style={{color: gray, fontSize:20}}>
                    {`${cardIdx + 1} / ${questions.length}`}
                </Text>
              </View>  

              <View style={styles.container}>

                  {/* Card displaying QUESTION */}
                  <Animated.View style={[styles.flipCard, frontAnimatedStyle]}>
                    <Text style={styles.flipTextFront}>
                      {questions[cardIdx].question}
                    </Text>
                  </Animated.View >

                  {/* Card displaying ANSWER */}
                  <Animated.View  style={[backAnimatedStyle, styles.flipCard, styles.flipCardBack]}>
                    <Text style={styles.flipTextBack}>
                      {questions[cardIdx].answer}
                    </Text>
                  </Animated.View >
                  
                  {/* Flip card button */}
                  <TouchableOpacity onPress={()=> this.flipCard()}>
                    <Text style={{color: red, fontSize:16}}>
                      Press to Flip-{flipSide}!
                    </Text>
                  </TouchableOpacity>


                {/* Correct and Incorrect button */}
                <View style={[{marginTop: 30}]}>
                  <TouchableOpacity style={[styles.btn, styles.btnCorrect]} onPress={() => this.handleSelectClick('true')}>
                    <Text style={styles.btnText}>Correct</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={[styles.btn, styles.btnInCorrect]} onPress={() => this.handleSelectClick('false')}>
                    <Text style={styles.btnText}>Incorrect</Text>
                  </TouchableOpacity>

                </View>
              </View>
          </View>

        )
        :(
          //End Result with Score page
          <View style={styles.Scorecontainer}>
            <Animated.Text style={[styles.score, {transform: [{scale: bounceScore}] }]}>
              {(score / questions.length * 100).toFixed(0)} %
              </Animated.Text>
            <Text style={styles.underScoreTxt}>Correct!</Text>

            {/* Restart button */}
            <TouchableOpacity style={[styles.btn, styles.btnCorrect]} 
            onPress={this.handleRestart}>
              <Text style={styles.btnText}>Restart Quiz</Text>
            </TouchableOpacity>

            {/* Back button with navigation to DeckSetting page */}
            <TouchableOpacity 
              style={[styles.btn, styles.btnBack]} 
              onPress={() => navigation.navigate('DeckSetting') }>
              <Text style={styles.btnBackText}>Back to Deck</Text>
            </TouchableOpacity>
          </View>
           
        )}
      </View>
    );
  };
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  Scorecontainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: orange
  },
  flipCard: { 
    width: 300,
    height: 150,
    marginTop: 1,
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: green,
    backfaceVisibility: 'hidden',
  },
  flipCardBack: {
    backgroundColor: darkorange,
    position: "absolute",
    top: 0,
  },
  flipTextFront: {   
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 6,
    marginRight: 6
  },
  flipTextBack: {   
    fontSize: 15,
    color: 'white',
    marginLeft: 20,
    marginRight: 10
},
  numberOfPage: {
    marginTop: 1,
    marginLeft: 10,
    marginBottom: 10,
  },
  btn: {
    borderRadius: 3,
    height: 40,
    width: 120,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  btnCorrect: {
    backgroundColor: purple,
  },
  btnInCorrect: {
    backgroundColor: red,
  },
  btnBack: {
    backgroundColor: white,
  },
  btnText: {
    color: white,
    fontWeight: '500',
  },
  btnBackText: {
    color: purple,
    fontWeight: '500',
  },
  score: {
    marginTop: 60,
    fontSize: 60,
    fontWeight:'bold',
    marginBottom: 30,
    color: purple
  },
  underScoreTxt: {
    fontSize: 20,
    color: blue,
    marginBottom: 40,
  }
});

function mapStateToProps ({ decks }, {route}){
  const { deckId } = route.params;
  return {
      deck: decks[deckId]
  };
};

export default  connect(mapStateToProps)(Quiz);
