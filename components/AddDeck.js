import React, { Component } from 'react'
import { StyleSheet,
         Text, 
         View, 
         KeyboardAvoidingView 
        } from 'react-native'
import { connect } from 'react-redux'
import { TextInput } from 'react-native-gesture-handler';
import { handleAddDeck } from '../actions'

import { purple, white, gray } from '../utils/colors'
import TouchButton from './TouchButton'


class NewDeck extends Component{
    state ={
        input: '',       
    }
    handleInputChange = (input) =>{
        this.setState({
            input
        })
    }
    submitDeck = () =>{
        const { input } = this.state
        const { dispatch, navigation } = this.props
        const deck = {
            title: input,
            questions: [],
        }
        dispatch(handleAddDeck(deck))

        this.setState({
            input: ''
        })
        navigation.navigate(
            "DeckSetting",
            {title: input}
            )

    }
    render(){
        const { input} = this.state
        return(
            <View style={styles.container}>
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <Text style={[styles.header, {color: purple}]}>
                    Give your deck a title
                </Text>
                <View style={{flexDirection: 'row', height: 35}}> 
                <TextInput 
                    value={input}
                    style={styles.input}
                    placeholder="Type title here"
                    onChangeText={this.handleInputChange}
                    />
                </View>
                <TouchButton
                    onPress={this.submitDeck}
                    disabled={input.length ===0? true : false} 
                    text="Create Deck"/>
            </KeyboardAvoidingView>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container:{    
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: white,

    },
    header: {
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 35,
        padding: 30,
        textAlign: 'center',

    },
    input: {
        flex:0.4,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 2,
        borderWidth: 1,
        borderColor: gray,
        paddingLeft: 5,
        backgroundColor: white

    }
  })



export default connect()(NewDeck); 