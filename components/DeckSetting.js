import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native'
import { connect } from 'react-redux'
import { FontAwesome } from '@expo/vector-icons'
import { removeDeckAction } from '../actions/index'
import {removeDeck, getDecks} from '../utils/api'

import { purple, white, orange, red } from '../utils/colors'
import CustomBtn from './CustomBtn'


class DeckSetting extends Component{

    setTitle = (deckTitle) =>{
        this.props.navigation.setOptions({
            title: deckTitle + ' Deck'
        })
    }

    deleteDeck = async(id) => {
        const {removeDeck } = this.props;
        removeDeckAction(id);
        getDecks();
        this.props.navigation.navigate('Home', {screen: 'Home'})
    }

    render(){
        const { questions, title, navigation } = this.props
        this.setTitle(title) 
        return(
            <View style={styles.container}>

                <Text style={styles.cardNumber}>{questions.length} cards</Text>
                <TouchableOpacity style={styles.btnLight} onPress={() => navigation.navigate(
                'AddCard',
                {deckId: title}
                )}>
                    <Text style={styles.btnTextDark}>Add Card</Text>
                </TouchableOpacity>
                <CustomBtn 
                    onPress={() => navigation.navigate(
                        'Quiz',
                        {deckId: title}
                        )}
                    disabled= {questions.length === 0? true: false} 
                    text="Start Quiz"/>
                
                <TouchableOpacity onPress={() => this.deleteDeck(title)}>
                    <Text style={styles.deleteBtnText}>Delete Deck</Text>
                </TouchableOpacity>

                {questions.length === 0
                ? (
                    <View style={{flexDirection:'row', flexWrap:'wrap', margin:3, padding:5}}>
                        <FontAwesome name='warning' size={15} color={red} />
                        <Text style={{color:red}}>Add card before you can start quiz</Text>
                    </View>
                )
                : null
                }
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: orange,
    },
    cardNumber: {
        marginTop: 30,
        marginBottom: 30,
        fontSize: 20,
        color: purple
    },
    btnLight: {
        backgroundColor: white,
        borderRadius: 5,
        height: 40,
        width: 150,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
    },
    btnTextDark: {
        color: purple,
        fontWeight: '500',
    },
    deleteBtnText: {
        marginTop: 30,
        marginBottom: 30,
        fontSize: 18,
        color: purple,
    }
  })


function mapStateToProps({ decks }, { route} ){
    const { title } = route.params
    return{
        title,
        questions : decks[title].questions
    }
}

export default connect(mapStateToProps)(DeckSetting) 