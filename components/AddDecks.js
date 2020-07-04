import React, {Component} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {white, gray} from '../utils/colors'


export default class AddDecks extends Component {
    render(){
        return(
            <View style={styles.container}>
                <Text>Adding Deck of Cards</Text>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: white,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
